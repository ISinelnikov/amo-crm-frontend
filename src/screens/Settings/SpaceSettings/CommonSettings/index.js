import React from "react";
import cn from "classnames";
import styles from "./CommonSettings.module.css";
import TextInput from "../../../../components/TextInput";
import Item from "../../Item";

const CommonSettings = ({className}) => {
    return (
        <Item
            className={cn(styles.card, className)}
            title="Общая информация"
            classTitle="title-purple"
        >
            <form onSubmit={(event) => {
                event.preventDefault();
            }}>
                <div className={styles.fieldset}>
                    <TextInput
                        className={styles.field}
                        value={'v11456'}
                        label="Название пространства"
                        name="email"
                        type="email"
                        required
                    />
                    <TextInput
                        className={styles.field}
                        value={'v11456'}
                        label={`OSS Domain: v11456.order-stat.studio`}
                        name="value"
                        type="text"
                        placeholder="OSS Domain"
                        required
                    />
                </div>
                <button className={cn("button-stroke", styles.button)}>
                    Обновить настройки пространства
                </button>
            </form>
        </Item>
    );
};

export default CommonSettings;
