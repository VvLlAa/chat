import styles from "./ChatWindow.module.css";
import Message from "./Message.tsx";
import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import plusSvg from '../../assets/plus.svg'
import { getFormattedTime } from "../../utils/FormattedTime.ts";
import {useDispatch, useSelector} from 'react-redux';
import { RootState } from '../../store/store.ts'
import {addMessage, getMessage, selectUser} from "../../store/MainStore.ts";
import {HeaderChat} from "./HeaderChat.tsx";
import {openModal} from "../../store/ModalStore.ts"

interface ChatProps {
    idInstance: string;
    apiTokenInstance: string;
}

export const ChatWindow: React.FC<ChatProps> = ({ idInstance, apiTokenInstance}) => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState<string>('');
    const selectedUser = useSelector((state: RootState) => state.auth.selectedUser);
    const stateUsers = useSelector((state: RootState) => state.auth.users);

    const sendMessage = async () => {
        if (!message.trim()) return;

        try {
            const response = await axios.post(
                `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
                {
                    chatId: `${selectedUser?.number}@c.us`,
                    message: message,
                }
            );

            if (response.status === 200) {
                const newMessage = {
                    text: message,
                    time: getFormattedTime(),
                    isOutgoing: true
                };

                dispatch(addMessage(newMessage));

                if (selectedUser) {
                    dispatch(selectUser({
                        ...selectedUser,
                        messages: [...selectedUser.messages, newMessage]
                    }));
                }

                setMessage('');
            } else {
                console.error('Ошибка отправки: ', response.data);
            }
        } catch (error) {
            console.error('Ошибка при отправке сообщения: ', error);
        }
    };

    const isProcessingMessages = useRef(false);


    const receiveMessages = async () => {
        if (isProcessingMessages.current) return;
        isProcessingMessages.current = true;

        try {
            const response = await axios.get(
                `https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`
            );

            if (response.data && response.data.body && response.data.body.messageData) {
                const receiptId = response.data.receiptId;
                const newMessage = response.data.body.messageData.textMessageData?.textMessage;
                const senderId = response.data.body.senderData?.chatId?.replace('@c.us', '');
                if (newMessage) {
                    const incomingMessage = {
                        text: newMessage,
                        time: getFormattedTime(),
                        isOutgoing: false
                    };

                    dispatch(getMessage({message: incomingMessage,number: senderId}));

                    if (selectedUser?.number === senderId) {
                        dispatch(selectUser({
                            ...selectedUser,
                            number: senderId,
                            messages: [...(selectedUser?.messages || []), incomingMessage]
                        }));
                    }
                }

                if (receiptId) {
                    const deleteResponse = await axios.delete(
                        `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`
                    );
                    console.log('Уведомление удалено:', deleteResponse.data);
                }
            } else if(response.data) {
                const deleteResponse = await axios.delete(
                    `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${response.data.receiptId}`
                );
                console.log('Очиска полностью', deleteResponse)
            }
        } catch (error) {
            console.error('Ошибка при получении сообщения:', error);
        } finally {
            isProcessingMessages.current = false;
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            receiveMessages();
        }, 2000);

        return () => clearInterval(interval);
    }, [selectedUser]);

    return (
        <div className={styles.userChat}>
            <span className={styles.test}/>
            <div className={styles.message}>
                <HeaderChat phoneClient={selectedUser?.number ? selectedUser?.number : ''}/>
                {stateUsers.length > 0
                    ? <Message messages={(selectedUser?.messages || [])} />
                    : <div className={styles.blockBtn}><div className={styles.addContact} onClick={() => dispatch(openModal())}>Добавить контакт</div></div>
                }

            </div>
            <form className={styles.messageSet} onSubmit={(e) => {
                e.preventDefault();
                sendMessage()
            }}>
                <img className={styles.img} src={plusSvg} alt=""/>
                <input
                    type="text"
                    placeholder="Введите сообщение"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </form>
        </div>
    );
};