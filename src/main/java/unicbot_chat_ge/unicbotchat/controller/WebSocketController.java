package unicbot_chat_ge.unicbotchat.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import unicbot_chat_ge.unicbotchat.listener.WebSocketEventListener;
import unicbot_chat_ge.unicbotchat.model.BoardStep;
import unicbot_chat_ge.unicbotchat.model.ChatMessage;

import java.util.Arrays;

@Controller
public class WebSocketController {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/publicChatRoom")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/chat.sendBoardAction")
    @SendTo("/topic/publicChatRoom")
    public BoardStep sendMessage(@Payload BoardStep message) {
        logger.info("/chat.sendBoardAction received! " + Arrays.toString(message.getContent()));
        return message;
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/publicChatRoom")
    public ChatMessage addUser(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        return chatMessage;
    }

}