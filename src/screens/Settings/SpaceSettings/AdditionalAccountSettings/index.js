import React from "react";
import cn from "classnames";
import styles from "./AdditionalAccountSettings.module.css";
import Item from "../../Item";

const AdditionalAccountSettings = ({className}) => {

    return (
        <Item
            className={cn(styles.card, className)}
            title="Пользователи"
            classTitle="title-purple"
        >
            <div className={styles.content}>
                Доступно приглашений: 2
            </div>
            <div className={styles.line}>
                <div className={styles.title}>
                    Приглашенных пользователей не найдено
                </div>
                <button className={cn("button-stroke", styles.button)}>
                    Отправить приглашение
                </button>
            </div>
            <div className={styles.content}>
                Вы можете пригласить других пользователей присоединиться к Вашей огранизации для совместной работы.
                После того как Вы добавите пользователя, на указанный при добавлении email будет отправлена ссылка
                для авторизации.
            </div>
            <div className={styles.content}>
                Приглашенный пользователь создается без возможности редактирования настроек системы,
                сведений и интеграций организации.
            </div>
            <div className={styles.content}>
                Вы можете отключить или удалить приглашенного пользователя в любое время.
                Нельзя добавить пользователя, принявшего приглашение в другую организацию.
            </div>

        </Item>
    );
};

export default AdditionalAccountSettings;
