import classes from "./HeaderLeftMenu.module.css";

export const HeaderLeftMenu = () => {
    return (
        <div className={classes.title}>
            <div className={classes.titleBlock}>
                <h2>Чаты</h2>
            </div>
            <input className={classes.input} type="text"/>
        </div>
    );
};