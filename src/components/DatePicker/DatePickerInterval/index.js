import styles from './DatePickerInterval.module.css';
import cn from "classnames";
import Icon from "../../Icon";
import Modal from "../../Modal";
import DatePicker from "react-datepicker";
import {useState} from "react";
import {beginMonthDate, formatInterval, UI_DATE_FORMAT} from "../../../service/DateService";

const DatePickerInterval = ({onChange}) => {
    const [visibleModal, setVisibleModal] = useState(false);
    const [interval, setInterval] = useState({from: beginMonthDate(), to: new Date()})

    const title = () => {
        const {from, to} = formatInterval(interval, UI_DATE_FORMAT);
        return `${from} - ${to}`;
    }

    return (
        <div className={styles.interval}>
            <div>
                <div className={cn(styles.item)} onClick={() => setVisibleModal(true)}>
                    <div className={styles.head}>
                        <Icon name={'calendar'} size="20px"/>
                        <div>
                            <div className={styles.title}>{'Интервал'}</div>
                            <div>
                                {title()}
                            </div>
                        </div>
                    </div>
                </div>
                <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
                    <DatePicker
                        dateFormatCalendar={"MMMM yyyy"}
                        selected={interval.from}
                        onChange={dates => {
                            const [from, to] = dates;
                            setInterval({from, to});
                            if (from !== null && to !== null) {
                                setVisibleModal(false);
                                onChange({from, to});
                            }
                        }}
                        startDate={interval.from}
                        endDate={interval.to}
                        selectsRange
                        inline
                    />
                </Modal>
            </div>
        </div>
    )
}

export default DatePickerInterval;