import React from 'react';
import classes from "./Message.module.css";

interface MessageProps {
    messages: { text: string; time: string; isOutgoing: boolean }[];
}

const Message: React.FC<MessageProps> = ({ messages = [] }) => {
    return (
        <div className={classes.messageBlock}>
            {messages.map((msg, index) => (
                <div
                    key={index}
                    style={{
                        textAlign: msg.isOutgoing ? "right" : "left",
                        margin: "10px",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: msg.isOutgoing ? "#96e38c" : "#ECECEC",
                            padding: "10px",
                            borderRadius: "10px",
                            display: "inline-block",
                            color: "#000",
                        }}
                        className={classes.message}
                    >
                        <div className={classes.messageContent}>
                            <div>{msg.text}</div>
                            <div className={classes.time}>{msg.time}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Message;