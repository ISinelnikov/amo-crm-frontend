import styles from './DatePickerSingle.module.css';
import cn from "classnames";
import Icon from "../../Icon";
import {format} from "date-fns";
import Modal from "../../Modal";
import DatePicker from "react-datepicker";
import {useState} from "react";

const DatePickerMonth = ({onChange}) => {
    const [visibleModal, setVisibleModal] = useState(false);
    const [date, setDate] = useState(new Date());

    return (
        <div>
            <div className={cn(styles.item)} onClick={() => setVisibleModal(true)}>
                <div className={styles.head}>
                    <Icon name={'calendar'} size="20px"/>
                    <div>
                        <div className={styles.title}>Месяц</div>
                        <div>{format(date, 'MM.yyyy')}</div>
                    </div>
                </div>
            </div>
            <Modal outerClassName={styles.modal} visible={visibleModal} onClose={() => setVisibleModal(false)}>
                <DatePicker
                    selected={date}
                    onChange={(value) => {
                        setDate(value);
                        onChange(value);
                        setVisibleModal(false);
                    }}
                    dateFormatCalendar={"MMMM yyyy"}
                    showMonthYearPicker
                    showFullMonthYearPicker
                    single
                    inline
                />
            </Modal>
        </div>
    )
}

export default DatePickerMonth;