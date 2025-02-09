import classes from "./CardUser.module.css";
import userPng from "../../assets/user.png";
import React from "react";

interface MenuProps {
    phoneClient: string;
}

export const CardUser: React.FC<MenuProps> = ({ phoneClient}) => {

    const formatPhone = (phoneClient: string): string => {
        return phoneClient.replace(/^(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/, "$1 $2 $3 $4 $5");
    };

    return (
        <div className={classes.userCard}>
            {phoneClient ? (
                <>
                    <img className={classes.photoUser} src={userPng} />
                    <div className={classes.numberPhone}>
                        +{formatPhone(phoneClient)}
                    </div>
                </>
            ) : null}

        </div>
    );
};