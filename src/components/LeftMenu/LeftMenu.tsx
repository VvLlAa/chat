import classes from "./LeftMenu.module.css";
import {CardUser} from "../Shared/CardUser.tsx";
import {ModalAddContact} from "./Modal/ModalAddContact.tsx";
import {useDispatch, useSelector} from 'react-redux';
import { RootState } from '../../store/store.ts'
import {selectUser, UserStore} from "../../store/MainStore.ts";
import {HeaderLeftMenu} from "./HeaderLeftMenu.tsx";

export const LeftMenu = () => {
    const users = useSelector((state: RootState) => state.auth.users);
    const selUser = useSelector((state: RootState) => state.auth.selectedUser);
    const dispatch = useDispatch();

    const selectedUser = (us : UserStore) => {
        dispatch(selectUser(us))
    }
    return (
        <div className={classes.leftMenu}>
            <HeaderLeftMenu/>
            {users.map((user, index) => (
                <div  key={index} onClick={() => selectedUser(user)} className={user.number === selUser?.number ? classes.active : ''}>
                    <CardUser phoneClient={user.number}/>
                </div>
            ))}
            <ModalAddContact/>
        </div>
    );
};