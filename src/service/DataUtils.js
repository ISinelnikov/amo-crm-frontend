import {trimValue} from "./StringUtils";

const NONE = 'NONE';
const ASC = 'ASC';
const DESC = 'DESC';

const sortByValue = () => {
    return function (elem1, elem2) {
        if (elem1.hasOwnProperty('value') && elem2.hasOwnProperty('value')) {
            if (elem1.value < elem2.value) {
                return -1;
            } else if (elem1.value > elem2.value) {
                return 1;
            } else {
                return 0;
            }
        }
        return 0;
    };
}

const sortByOrderId = () => {
    return function (elem1, elem2) {
        if (elem1.hasOwnProperty('orderId') && elem2.hasOwnProperty('orderId')) {
            if (elem1.orderId < elem2.orderId) {
                return -1;
            } else if (elem1.orderId > elem2.orderId) {
                return 1;
            } else {
                return 0;
            }
        }
        return 0;
    };
}

const sortByFilters = (rows, filters) => {
    const result = [...rows];

    filters.forEach(filter => {
        const type = filter.type;
        if (type !== NONE) {
            const key = filter.key;

            result.sort(function (left, right) {
                return trimValue(left[key]) > trimValue(right[key])
                    ? (type === ASC ? 1 : -1)
                    : trimValue(left[key]) < trimValue(right[key])
                        ? (type === ASC ? -1 : 1) : 0;
            })
        }
    })

    return result;
}

export {
    NONE,
    ASC,
    DESC,
    sortByOrderId,
    sortByValue,
    sortByFilters
}