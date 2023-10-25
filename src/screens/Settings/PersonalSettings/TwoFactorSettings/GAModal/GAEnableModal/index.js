import styles from "../../TwoFactorSettings.module.css";
import AuthCode from "../../../../../../components/AuthCode";
import Modal from "../../../../../../components/Modal";
import React, {useState} from "react";
import ApiUtil from "../../../../../../service/ApiUtil";
import ErrorNote from "../../../../../../components/ErrorNote";

const GAEnableModal = ({visible, setVisible, enabled, qrCode}) => {
    const [error, setError] = useState(false);

    const verifyQrCode = (code) => {
        try {
            ApiUtil.enableGoogleAuthenticatorQRCode(code)
                .then(body => {
                    enabled();
                    setVisible(false);
                })
                .catch(error => {
                    console.log(error);
                    setError(true)
                });
        } catch (ignored) {
            setError(true);
        }
    }

    return (
        <Modal visible={visible} onClose={() => setVisible(false)}>
            <div>
                <div className={styles.content}>
                    Отсканируйте QR код с помощью приложения Google Authenticator.
                </div>
                <div className={styles.wrapper}>
                    <img src={qrCode} alt="QRCode"/>
                </div>
                <div className={styles.content}>
                    Введите временный код из приложения для активации двухфакторной аутентификации.
                    <br/>
                    После активации двухфакторной аутентификации QR код будет скрыт.
                </div>
                <div className={styles.wrapper}>
                    <AuthCode onChange={() => error && setError(false)}
                              onComplete={code => verifyQrCode(code)}/>
                </div>
                {error && <ErrorNote message={'Ошибка подтверждения, некорректный код'}/>}
            </div>
        </Modal>
    );
}

export default GAEnableModal;