import React, {useState} from "react";
import styles from './CommonFilter.module.css';
import DatePickerMonth from "../DatePicker/DatePickerMonth";
import DatePickerInterval from "../DatePicker/DatePickerInterval";
import PipelineDropdown from "../PipelineDropdown";

const CommonFilter = (
    {
        pipeline = false,
        interval = false,
        month = false,
        onChange
    }
) => {
    const [filter, setFilter] = useState({
        selectedPipelineId: null,
        selectedInterval: {},
        selectedMonth: new Date()
    })

    const update = updated => {
        const {selectedPipelineId, selectedInterval, selectedMonth} = updated;
        console.log(updated);
        onChange({
            ...pipeline ? {selectedPipelineId} : {},
            ...interval ? {selectedInterval} : {},
            ...month ? {selectedMonth} : {}
        });
        setFilter(updated);
    }

    return (
        <div className={styles.filter}>
            {pipeline && <PipelineDropdown onChange={selectedPipelineId => update({...filter, selectedPipelineId})}/>}
            {interval && <DatePickerInterval onChange={selectedInterval => update({...filter, selectedInterval})}/>}
            {month && <DatePickerMonth onChange={selectedMonth => update({...filter, selectedMonth})}/>}
        </div>
    )
}

export default CommonFilter;