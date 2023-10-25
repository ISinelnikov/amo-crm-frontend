import React, {useEffect, useState} from "react";
import cn from "classnames";
import styles from "./StatusDetails.module.css";
import StatusHistoryRow from "./StatusHistoryRow";
import DatePickerInterval from "../../../components/DatePicker/DatePickerInterval";
import Card from "../../../components/Card";
import {formatInterval} from "../../../service/DateService";
import Dropdown from "../../../components/Dropdown";
import ApiUtil from "../../../service/ApiUtil";

const StatusDetails = () => {
    const [activePipelineTab, setActivePipelineTab] = useState(null);
    const [activeUserTab, setActiveUserTab] = useState(null);

    const [interval, setInterval] = useState({from: new Date(), to: null});

    const [rows, setRows] = useState([]);

    const [values, setValues] = useState({
        users: [],
        pipelines: []
    });

    useEffect(() => {
        const {from, to} = formatInterval(interval);
        ApiUtil.getDashboardStatusInfo(
            from, to,
            activePipelineTab ? activePipelineTab.pipelineId : null,
            activeUserTab ? activeUserTab.id : null
        ).then(body => {
            setRows(body);
        }).catch(error => {
            console.log(error);
        });
    }, [interval, activePipelineTab, activeUserTab])


    useEffect(() => {
        ApiUtil.getDropdownValues()
            .then(body => {
                setValues(body);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    return (
        <Card
            className={styles.card}
            title="История статусов сделки"
            classTitle={cn("title-purple", styles.title)}
            classCardHead={cn(styles.head)}
            head={
                <div className={styles.filter}>
                    <Dropdown
                        className={cn(styles.dropdown, "mobile-hide")}
                        classDropdownHead={styles.dropdownHead}
                        value={activePipelineTab}
                        setValue={setActivePipelineTab}
                        emptyValue={true}
                        options={values.pipelines}
                        small
                    />
                    <Dropdown
                        className={cn(styles.dropdown, "mobile-hide")}
                        classDropdownHead={styles.dropdownHead}
                        value={activeUserTab}
                        emptyValue={true}
                        setValue={setActiveUserTab}
                        options={values.users}
                        small
                    />
                    <DatePickerInterval onChange={setInterval}
                    />
                </div>
            }
        >
            <div className={cn(styles.row)}>
                <StatusHistoryRow rows={rows}/>
            </div>
        </Card>
    );
};

export default StatusDetails;
