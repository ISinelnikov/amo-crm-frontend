import React, {useState} from "react";
import cn from "classnames";
import styles from "./SignIn.module.css";
import {use100vh} from "react-div-100vh";
import {Link} from "react-router-dom";
import TextInput from "../../components/TextInput";
import Image from "../../components/Image";
import ApiUtil from "../../service/ApiUtil";
import AuthCode from "../../components/AuthCode";
import ErrorNote from "../../components/ErrorNote";

const SignIn = ({onSuccessLogin}) => {
    const [requestId, setRequestId] = useState(null);

    const [active, setActive] = useState(true);

    const [oneFactorError, setOneFactorError] = useState(false);
    const [twoFactorError, setTwoFactorError] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const heightWindow = use100vh();

    const oneFactorAuth = (username, password) => {
        ApiUtil.oneFactorLogin(username, password)
            .then(body => {
                if (body.token) {
                    onSuccessLogin(body.token);
                } else {
                    setRequestId(body.twoFactorRequestId);
                }
            })
            .catch(error => {
                console.log('type error', error.name);
                setActive(true);
                setOneFactorError(true);
            });
    };

    const twoFactorAuth = (code) => {
        ApiUtil.twoFactorLogin(requestId, code)
            .then(body => {
                onSuccessLogin(body.token);
            })
            .catch(error => {
                console.log('/api/security/login2', error);
                setActive(true);
                setTwoFactorError(true)
            });
    };

    const handleChange = () => {
        active === false && setActive(true);
        oneFactorError && setOneFactorError(false);
    }

    const firstAuthStep = () => <>
        <div className={styles.subtitle}>
            Используйте данные своей учетной записи для входа в систему.
        </div>
        <form onSubmit={(event) => {
            event.preventDefault();
            if (username.length > 0 && password.length > 0) {
                oneFactorAuth(username, password);
            }
        }}>
            <TextInput
                className={styles.field}
                name="email"
                type="email"
                placeholder="Почта"
                required
                icon="mail"
                value={username}
                onChange={event => {
                    setUsername(event.target.value);
                    handleChange();
                }}
            />
            <TextInput
                className={styles.field}
                name="password"
                type="password"
                placeholder="Пароль"
                required
                icon="lock"
                value={password}
                onChange={event => {
                    setPassword(event.target.value);
                    handleChange();
                }}
            />
            <button onClick={() => setActive(false)}
                    className={cn("button", styles.button, {disabled: !active})}>
                Войти
            </button>
            {oneFactorError && <ErrorNote message={'Ошибка входа, переданы некорректные данные'}/>}
        </form>
        <div className={styles.link}>
            Нет аккаунта?{" "}
            <Link className={styles.info} to="/sign-up">
                Перейти к регистрации
            </Link>
        </div>
    </>

    const secondAuthStep = () => <>
        <div className={styles.subtitle}>
            Для аккаунта включена двухфакторная аутентификация.
            <br/>
            Введите код для продолжения.
        </div>
        <AuthCode onChange={() => twoFactorError && setTwoFactorError(false)}
                  onComplete={code => twoFactorAuth(code)}
        />
        {twoFactorError && <ErrorNote message={'Ошибка подтверждения, некорректный код'}/>}
    </>

    return (
        <div className={styles.login} style={{minHeight: heightWindow}}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <Link className={styles.logo} to="/">
                        <Image
                            className={styles.pic}
                            src="/images/logo-light.svg"
                            srcDark="/images/logo-light.svg"
                            alt="OSS"
                        />
                    </Link>
                </div>
                <div className={cn("h2", styles.title)}>Авторизация</div>
                <div className={styles.body}>
                    {
                        requestId === null ? firstAuthStep() : secondAuthStep()
                    }
                </div>
            </div>
        </div>
    );
};

export default SignIn;
