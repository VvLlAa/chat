import {useDispatch, useSelector} from "react-redux";
import { addNewUser } from "../../../store/MainStore.ts";
import { AddContactForm } from "./NewContactForm.tsx";
import classes from "./ModalAddContact.module.css";
import {closeModal, toggleModal} from "../../../store/ModalStore.ts";
import {RootState} from "../../../store/store.ts";


export const ModalAddContact = () => {
    const dispatch = useDispatch();
    const showModal = useSelector((state: RootState) => state.modal.showModal);

    const handleAddUser = (phone: string) => {
        dispatch(addNewUser({ number: phone, messages: [] }));
        dispatch(closeModal());
    };

    return (
        <>
            <div
                className={`${classes.addChat} ${
                    showModal === null ? "" : showModal ? classes.showBtn : classes.closeBtn
                }`}
                onClick={() => dispatch(toggleModal())}
            >
                <span className={classes.styleBtn}>{showModal ? "x" : "+"}</span>
            </div>

            {showModal && <span className={classes.shellBack} onClick={() => dispatch(closeModal())}></span>}

            <div className={`${classes.modalAdd} ${showModal === null ? "" : showModal ? classes.show : classes.close}`}>
                <AddContactForm onSubmit={handleAddUser} />
            </div>
        </>
    );
};
