import React, { useState } from 'react';
import styles from './Auth.module.css';
import { useDispatch } from "react-redux";
import { setAuthData } from "../../store/MainStore.ts";

interface AuthProps {
    onAuth: (
        idInstance: string,
        apiTokenInstance: string,
    ) => void
}

const Auth: React.FC<AuthProps> = ({ onAuth }) => {
    const [idInstance, setIdInstance] = useState<string>('');
    const [apiTokenInstance, setApiTokenInstance] = useState<string>('');
    const [errors, setErrors] = useState<{ idInstance?: string; apiTokenInstance?: string; phone?: string }>({});

    const dispatch = useDispatch();

    const validateForm = () => {
        const newErrors: typeof errors = {};

        if (!idInstance.trim()) {
            newErrors.idInstance = "Введите idInstance";
        }

        if (!apiTokenInstance.trim()) {
            newErrors.apiTokenInstance = "Введите apiTokenInstance";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            onAuth(idInstance, apiTokenInstance);
            dispatch(setAuthData({
                idInstance,
                apiTokenInstance,
                users: [],
                selectedUser: null
            }));
        }
    };

    return (
        <div className={styles.authContainer}>
            <h2>Введите учетные данные GREEN-API</h2>
            <form onSubmit={handleSubmit} className={styles.authForm}>
                <div className={styles.blockInput}>
                    <input
                        type="text"
                        placeholder="idInstance"
                        value={idInstance}
                        onChange={(e) => {
                            setIdInstance(e.target.value);
                            if (errors.idInstance) {
                                setErrors((prev) => ({ ...prev, idInstance: "" }));
                            }
                        }}
                        className={`${styles.input} ${errors.idInstance ? styles.inputError : ""}`}
                    />
                    {errors.idInstance && <p className={styles.error}>{errors.idInstance}</p>}
                </div>
                <div className={styles.blockInput}>
                    <input
                       type="text"
                       placeholder="apiTokenInstance"
                       value={apiTokenInstance}
                       onChange={(e) => {
                           setApiTokenInstance(e.target.value);
                           if (errors.apiTokenInstance) {
                               setErrors((prev) => ({ ...prev, apiTokenInstance: "" }));
                           }
                       }}
                       className={`${styles.input} ${errors.apiTokenInstance ? styles.inputError : ""}`}
                    />
                    {errors.apiTokenInstance && <p className={styles.error}>{errors.apiTokenInstance}</p>}
                </div>
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default Auth;