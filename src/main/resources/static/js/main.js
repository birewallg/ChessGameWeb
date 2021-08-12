'use strict';


var messageForm = document.querySelector('#messageForm');
var messageInput = document.querySelector('#message');
var messageArea = document.querySelector('#messageArea');
var connectingElement = document.querySelector('#connecting');
var connectingElementBoard = document.querySelector('#connectingBoard');

var id18 = document.getElementById("18");
var id17 = document.getElementById("17");

var stompClient = null;
var username = null;


function connect() {
    username = document.querySelector('#username').innerText.trim();

    var socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, onConnected, onError);
}

// Connect to WebSocket Server.
connect();

function onConnected() {
    // Subscribe to the Public Topic
    stompClient.subscribe('/topic/publicChatRoom', onMessageReceived);

    // Tell your username to the server
    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({sender: username, type: 'JOIN'})
    )

    connectingElement.classList.add('hidden');
}


function onError(error) {
    connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement.style.color = 'red';
}


function sendMessage(event) {
    var messageContent = messageInput.value.trim();
    if(messageContent && stompClient) {
        var chatMessage = {
            sender: username,
            content: messageInput.value,
            type: 'CHAT'
        };
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        messageInput.value = '';
    }
    event.preventDefault();
}

var flagAction = true;
var startStep = "";
var content = "";
function sendBoardAction(event) {
    var step = event;
    if (flagAction)
        if (document.getElementById(step).innerText === "")
            return;

    flagAction = !flagAction;

    if (!flagAction) {
        startStep = step;
        content = document.getElementById(step).innerText;
        return;
    }

    //document.getElementById(startStep).innerText = "";
    //document.getElementById(step).innerText = content;

    if(stompClient) {
        var chatMessage = {
            sender: username,
            content: [startStep, step],
            type: 'BOARD_DATA'
        };
        stompClient.send("/app/chat.sendBoardAction", {}, JSON.stringify(chatMessage));
    }
}


function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);

    var messageElement = document.createElement('li');

    if(message.type === 'JOIN') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' joined!';
    } else if (message.type === 'LEAVE') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' left!';
    } else if (message.type === 'BOARD_DATA') {
        console.log("/chat.sendBoardAction received!" + message.content);
        document.getElementById(message.content[1]).innerText = document.getElementById(message.content[0]).innerText;
        document.getElementById(message.content[0]).innerText = "";
    } else {
        messageElement.classList.add('chat-message');
        var usernameElement = document.createElement('strong');
        usernameElement.classList.add('nickname');
        var usernameText = document.createTextNode(message.sender);
        var usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }

    var textElement = document.createElement('span');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);

    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
}


messageForm.addEventListener('submit', sendMessage, true);