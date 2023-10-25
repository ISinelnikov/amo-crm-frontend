import React from "react";
import styles from './ErrorNote.module.css';

const ErrorNote = ({message}) => {
    return (
        <div className={styles.message}>
            <b>{message}</b>
        </div>
    )
}

export default ErrorNote;