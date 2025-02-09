import React, {useEffect, useState} from "react";
import classes from "./NewContactForm.module.css";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store.ts";

interface AddContactFormProps {
    onSubmit: (phone: string) => void;
}

export const AddContactForm: React.FC<AddContactFormProps> = ({ onSubmit }) => {
    const showModal = useSelector((state: RootState) => state.modal.showModal)
    const [phone, setPhone] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const validatePhone = () => {
        if (!/^7\d{10}$/.test(phone)) {
            setError("Введите номер в формате 7XXXXXXXXXX");
            return false;
        }
        setError(null);
        return true;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validatePhone()) {
            onSubmit(phone);
            setPhone("");
        }
    };

    useEffect(() => {
        setError(null);
        setPhone("");
    }, [showModal]);

    return (
        <form className={classes.modalContent} onSubmit={handleSubmit}>
            <h3>Добавить новый контакт</h3>
            <input
                type="text"
                placeholder="Добавить: 7977777777"
                value={phone}
                onChange={(e) => {
                    setPhone(e.target.value.replace(/\D/g, ""));
                    if (error) setError(null);
                }}
                className={`${error ? classes.errorInp : ""}`}
            />
            {error && <p className={classes.error}>{error}</p>}
            <button type="submit">Добавить</button>
        </form>
    );
};
