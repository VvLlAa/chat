import React from 'react';
import classes from './Chat.module.css'
import {LeftMenu} from "./LeftMenu/LeftMenu.tsx";
import {ChatWindow} from "./Chat/ChatWindow.tsx";

interface ChatProps {
    idInstance: string;
    apiTokenInstance: string;
}

const Chat: React.FC<ChatProps> = ({ idInstance, apiTokenInstance }) => {
    return (
        <div className={classes.chat}>
            <LeftMenu/>
            <ChatWindow idInstance={idInstance} apiTokenInstance={apiTokenInstance}/>
        </div>
    );
};

export default Chat;