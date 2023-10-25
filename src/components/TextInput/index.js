import React, {useState} from "react";
import cn from "classnames";
import styles from "./TextInput.module.css";
import Icon from "../Icon";
import {Tooltip} from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css'

const TextInput = (
    {
        id,
        className,
        classLabel,
        classInput,
        label,
        disabled,
        icon,
        copy,
        currency,
        type,
        placeholder,
        value,
        name,
        onChange,
        required,
        tooltip,
        maxLength = 256
    }
) => {
    const [showTooltip, setShowTooltip] = useState(true);

    return (
        <div
            className={cn(
                styles.field,
                {[styles.fieldIcon]: icon},
                {[styles.fieldCopy]: copy},
                {[styles.fieldCurrency]: currency},
                className
            )}
        >
            {label && (
                <div className={cn(classLabel, styles.label)}>
                    {label}{" "}
                </div>
            )}
            <div className={styles.wrap}
                 onMouseEnter={() => setShowTooltip(true)}
                 onMouseLeave={() => {
                     setShowTooltip(false);
                     setTimeout(() => setShowTooltip(true), 50);
                 }}
            >
                <input className={cn(classInput, styles.input)}
                       name={name}
                       placeholder={placeholder}
                       type={type}
                       maxLength={maxLength}
                       value={value}
                       onChange={onChange}
                       disabled={disabled}
                       required={required}
                       data-tooltip-id={id}
                />
                {showTooltip && tooltip && <Tooltip id={id} place="top" content={tooltip}
                                                    style={{width: '400px'}}
                />}
                {icon && (
                    <div className={styles.icon}>
                        <Icon name={icon} size="24"/>{" "}
                    </div>
                )}
                {copy && (
                    <button className={styles.copy}>
                        <Icon name="copy" size="24"/>{" "}
                    </button>
                )}
                {currency && <div className={styles.currency}>{currency}</div>}
            </div>
        </div>
    );
};

export default TextInput;
