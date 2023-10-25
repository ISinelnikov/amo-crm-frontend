import React, {useEffect, useState} from "react";
import {formatInterval} from "../../../service/DateService";
import Card from "../../../components/Card";
import styles from "./DealsDetails.module.css";
import cn from "classnames";
import DatePickerInterval from "../../../components/DatePicker/DatePickerInterval";
import DealsRow from "./DealsRow";
import ApiUtil from "../../../service/ApiUtil";
import CSVLoader from "../../../components/CSVLoader";
import PipelineDropdown from "../../../components/PipelineDropdown";

const headers = [
    {label: "Менеджер", key: "name"},
    {label: "Встреч совершено", key: "completedMeets"},
    {label: "Встреч назначено", key: "preparedMeets"},
    {label: "Договоров заключено", key: "deals"},
    {label: "Выручка", key: "profit"}
];

const DealsDetails = () => {
    const [interval, setInterval] = useState({});
    const [pipelineId, setPipelineId] = useState(null);

    const [deals, setDeals] = useState([]);

    useEffect(() => {
        if (pipelineId !== null) {
            const {from, to} = formatInterval(interval);
            ApiUtil.getDashboardDealsInfo(
                from, to, pipelineId
            )
                .then(body => {
                    setDeals(body);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [interval, pipelineId]);

    const prepareCsvName = () => {
        const {from, to} = formatInterval(interval);
        return `managers-${from}-${to}.csv`;
    }

    return (
        <>
            <Card
                className={styles.card}
                title="Статистика менеджеров"
                classTitle={cn("title-purple", styles.title)}
                classCardHead={cn(styles.head)}
                head={
                    <div className={styles.buttons}>
                        <PipelineDropdown onChange={setPipelineId}/>
                        <DatePickerInterval onChange={setInterval}/>
                        <CSVLoader headers={headers} data={deals} filename={prepareCsvName()}/>
                    </div>
                }
            >
                <div className={cn(styles.row)}>
                    <DealsRow
                        className={styles.table}
                        deals={deals}
                    />
                </div>
            </Card>
        </>
    )
}

export default DealsDetails;