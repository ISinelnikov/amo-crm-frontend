import React from "react";
import cn from "classnames";
import styles from "./AuthCode.module.css";
import VerificationInput from "react-verification-input";

const AuthCode = ({onChange, onComplete}) => {
    return (
        <div className={styles.wrapper}>
            <VerificationInput
                classNames={{
                    character: cn(styles.character)
                }}
                length={6}
                autoFocus={true}
                passwordMode={true}
                validChars="0-9"
                inputProps={{
                    autoComplete: "one-time-code",
                    inputMode: "numeric"
                }}
                onComplete={value => onComplete(parseInt(value, 10))}
                onChange={onChange}
            />
        </div>
    );
};

export default AuthCode;