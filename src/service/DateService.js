import {format} from "date-fns";

const API_DATE_FORMAT = 'yyyy-MM-dd';
const UI_DATE_FORMAT = 'dd.MM.yyyy';

const beginMonthDate = function () {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
}

const formatInterval = (interval, pattern = API_DATE_FORMAT) => {
    const from = interval.from ? interval.from : beginMonthDate();
    const to = interval.to ? interval.to : new Date();
    return {
        from: format(from, pattern),
        to: format(to, pattern)
    };
}

const getFirstAndLastMonthDays = date => {
    const from = new Date(date.getFullYear(), date.getMonth(), 1);
    const to = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return {from, to};
}

export {
    API_DATE_FORMAT,
    UI_DATE_FORMAT,
    beginMonthDate,
    formatInterval,
    getFirstAndLastMonthDays
};