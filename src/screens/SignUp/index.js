import React, {useState} from "react";
import cn from "classnames";
import styles from "./SignUp.module.css";
import {use100vh} from "react-div-100vh";
import {Link} from "react-router-dom";
import TextInput from "../../components/TextInput";
import Image from "../../components/Image";
import ErrorNote from "../../components/ErrorNote";
import {idByV4, trimValue, validateEmail, validatePassword} from "../../service/StringUtils";
import {successNotification, warningNotification} from "../../components/Swal";
import ApiUtil from "../../service/ApiUtil";

const SignUp = () => {
    const [whiteLabelName, setWhiteLabelName] = useState('');
    const [incorrectWhiteLabelName, setIncorrectWhiteLabelName] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [incorrectFirstName, setIncorrectFirstName] = useState(false);

    const [lastName, setLastName] = useState('');
    const [incorrectLastName, setIncorrectLastName] = useState(false);

    const [email, setEmail] = useState('');
    const [incorrectEmail, setIncorrectEmail] = useState(false);

    const [password, setPassword] = useState('');
    const [incorrectPassword, setIncorrectPassword] = useState(false);

    const [active, setActive] = useState(true);

    const heightWindow = use100vh();

    const sendRequest = () => {
        ApiUtil.whiteLabelRegistration({
            whiteLabelName,
            firstName,
            lastName,
            email,
            password
        })
            .then(body => {
                console.log(body);

            })
            .catch(error => console.log(error));
    }

    const registrationCompleted = () => {
        return successNotification(
            'Аккаунт создан',
            'Для входа в систему перейдите по ссылке из письма отправленного на указанную почту'
        )
    }

    const registrationError = () => {
        return warningNotification(
            'Ошибка при создании аккаунта'
        )
    }

    const organizationNameValidator = value => trimValue(value).length > 2;

    const firstAndLastNameValidator = value => trimValue(value).length > 0;

    const prepareErrorNote = message => <ErrorNote message={message}/>

    const handleChange = (value, validator, setter) => setter(!validator(value));

    return (
        <div className={styles.login} style={{minHeight: heightWindow}}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <Link className={styles.logo} to="/">
                        <Image
                            className={styles.pic}
                            src="/images/logo-dark.svg"
                            srcDark="/images/logo-light.svg"
                            alt="OSS"
                        />
                    </Link>
                </div>
                <div className={cn("h2", styles.title)}>Регистрация</div>
                <div className={styles.body}>
                    <div className={styles.subtitle}>
                        Для создания аккаунта заполните форму ниже.
                    </div>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        setActive(false);
                        sendRequest();
                    }}>
                        <TextInput
                            id={idByV4()}
                            className={styles.field}
                            type="text"
                            placeholder="Название организации"
                            tooltip='Поле должно содержать не менее трех символовов.'
                            required
                            icon="info"
                            value={whiteLabelName}
                            onChange={event => {
                                const value = event.target.value;
                                setWhiteLabelName(value);
                                handleChange(value, organizationNameValidator, setIncorrectWhiteLabelName);
                            }}
                        />
                        {incorrectWhiteLabelName && prepareErrorNote('Некорректное название организации')}

                        <TextInput
                            id={idByV4()}
                            className={styles.field}
                            type="text"
                            placeholder="Имя пользователя"
                            tooltip='Поле должно содержать не менее одного символа.'
                            required
                            icon="info"
                            value={firstName}
                            onChange={event => {
                                const value = event.target.value;
                                setFirstName(value);
                                handleChange(value, firstAndLastNameValidator, setIncorrectFirstName);
                            }}
                        />
                        {incorrectFirstName && prepareErrorNote('Некорретное имя пользователя')}

                        <TextInput
                            id={idByV4()}
                            className={styles.field}
                            type="text"
                            placeholder="Фамилия пользователя"
                            tooltip='Поле должно содержать не менее одного символа.'
                            required
                            icon="info"
                            value={lastName}
                            onChange={event => {
                                const value = event.target.value;
                                setLastName(value);
                                handleChange(value, firstAndLastNameValidator, setIncorrectLastName);
                            }}
                        />
                        {incorrectLastName && prepareErrorNote('Некорректная фамилия пользователя')}

                        <TextInput
                            id={idByV4()}
                            className={styles.field}
                            type="email"
                            placeholder="Почта"
                            required
                            icon="mail"
                            value={email}
                            onChange={event => {
                                const value = event.target.value;
                                setEmail(value);
                                handleChange(value, validateEmail, setIncorrectEmail);
                            }}
                        />
                        {incorrectEmail && prepareErrorNote('Некорректная почта')}

                        <TextInput
                            id={idByV4()}
                            className={styles.field}
                            name="password"
                            type="password"
                            placeholder="Пароль"
                            tooltip='Пароль должен содержать не менее 8 знаков и состоять из следующих символов: числа 0-9, символы !@#$%^&*, латинские буквы A-Z и a-z'
                            required
                            icon="lock"
                            value={password}
                            onChange={event => {
                                const value = event.target.value;
                                setPassword(value);
                                handleChange(value, validatePassword, setIncorrectPassword);
                            }}
                        />
                        {incorrectPassword && prepareErrorNote('Некорректный пароль')}

                        <button onClick={() => {}}
                                className={cn("button", styles.button, {disabled: !active})}>
                            Зарегистрировать аккаунт
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
