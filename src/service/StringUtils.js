import {v4} from "uuid";

const trimValue = value => value ? value.trim() : '';

const validateEmail = email => email && /\S+@\S+\.\S+/.test(email);

const validatePassword = password => password
    && /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g.test(password);

const idByV4 = () => v4().replaceAll('-', '')

export {
    trimValue,
    validateEmail,
    validatePassword,
    idByV4
}
