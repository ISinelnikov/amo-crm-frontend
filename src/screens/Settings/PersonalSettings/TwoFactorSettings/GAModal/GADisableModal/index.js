import styles from "../../TwoFactorSettings.module.css";
import AuthCode from "../../../../../../components/AuthCode";
import Modal from "../../../../../../components/Modal";
import React, {useState} from "react";
import ApiUtil from "../../../../../../service/ApiUtil";
import ErrorNote from "../../../../../../components/ErrorNote";

const GADisableModal = ({visible, setVisible, disabled}) => {
    const [error, setError] = useState(false);

    const disableQrCode = (code) => {
        try {
            ApiUtil.disableGoogleAuthenticatorQRCode(code)
                .then(body => {
                    disabled();
                    setVisible(false);
                })
                .catch(error => {
                    console.log(error);
                    setError(true);
                });
        } catch (ignored) {
            setError(true);
        }
    }

    return (
        <Modal visible={visible} onClose={() => setVisible(false)}>
            <div>
                <div className={styles.content}>
                    Введите актуальный код для отключения двухфакторной аутентификации.
                </div>
                <div className={styles.wrapper}>
                    <AuthCode onChange={() => error && setError(false)}
                              onComplete={code => disableQrCode(code)}/>
                </div>
                {error && <ErrorNote message={'Ошибка подтверждения, некорректный код'}/>}
            </div>
        </Modal>
    );
}

export default GADisableModal;