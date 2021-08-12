package unicbot_chat_ge.unicbotchat.model;

public class BoardStep {
    private MessageType type;
    private int startCoord = 11;
    private int finishCoord = 11;
    //private String[] content = new String[] {"",""};
    private String[][] content = new String[][] {
            {"","","","","","","",""},
            {"","","","","","","",""},
            {"","","","","","","",""},
            {"","","","","","","",""},
            {"","","","","","","",""},
            {"","","","","","","",""},
            {"","","","","","","",""},
            {"","","","","","","",""}
    };

    BoardStep() {
        setType(MessageType.BOARD_DATA);
    }

    /* getters */
    public MessageType getType() {
        return type;
    }

    public String[][] getContent() {
        return content;
    }

    public int getStartCoord() {
        return startCoord;
    }

    public int getFinishCoord() {
        return finishCoord;
    }

    /* setters */
    public void setType(MessageType type) {
        this.type = type;
    }
    public void setStartCoord(int startCoord) {
        this.startCoord = startCoord;
    }

    public void setContent(String[][] content) {
        this.content = content;
    }

    public void setFinishCoord(int finishCoord) {
        this.finishCoord = finishCoord;
    }
}
