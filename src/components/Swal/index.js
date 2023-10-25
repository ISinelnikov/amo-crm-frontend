import Swal from "sweetalert2";
import './Swal.module.css';

const successNotification = (title, message) => {
    return (
        Swal.fire({
            title: title,
            text: message,
            icon: 'success',
            confirmButtonColor: '#3085d6',
        })
    )
}

const warningNotification = (title, message) => {
    return (
        Swal.fire({
            title: title,
            text: message,
            icon: 'warning',
            confirmButtonColor: '#3085d6',
        })
    )
}

export {
    successNotification,
    warningNotification
}