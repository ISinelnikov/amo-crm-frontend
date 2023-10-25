import React from "react";
import cn from "classnames";
import styles from "./Checkbox.module.css";

const Checkbox = (
    {
        className,
        color,
        value,
        onChange,
    }
) => {
    return (
        <label
            className={cn(styles.checkbox, className)}
        >
            <input
                className={styles.input}
                type="checkbox"
                onChange={event => {
                    onChange(event.target.checked);
                }}
                checked={value ? value : false}
            />
            <span className={styles.inner} style={{borderColor: color}}>
                <span className={cn(styles.tick)} style={{borderColor: color, background: value ? color : ''}}></span>
            </span>
        </label>
    );
};

export default Checkbox;
