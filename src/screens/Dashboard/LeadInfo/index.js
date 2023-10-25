import React, {useEffect, useState} from "react";
import cn from "classnames";
import styles from "./LeadInfo.module.css";
import Card from "../../../components/Card";
import PieChartCollection from "../../../components/PieChartCollection";
import {formatInterval} from "../../../service/DateService";
import ApiUtil from "../../../service/ApiUtil";
import CommonFilter from "../../../components/CommonFilter";
import {sortByValue} from "../../../service/DataUtils";

const LeadInfo = ({className}) => {
    const [leads, setLeads] = useState({
        all: [],
        qualified: [],
        closed: [],
    });

    const [filter, setFilter] = useState({
        selectedPipelineId: null,
        selectedInterval: {}
    });

    useEffect(() => {
        const {selectedPipelineId : pipelineId, selectedInterval : interval} = filter;
        if (pipelineId !== null && interval !== null) {
            const {from, to} = formatInterval(interval);
            ApiUtil.getDashboardLeadsItems(from, to, pipelineId)
                .then(body => {
                    setLeads(body);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }, [filter]);

    return (
        <>
            <Card
                className={cn(styles.card, className)}
                title="Источники"
                classTitle="title-purple"
                head={
                    <CommonFilter pipeline={true} interval={true} onChange={setFilter}/>
                }
            >
                <PieChartCollection
                    allLeads={leads.all.sort(sortByValue())}
                    qualifiedLeads={leads.qualified.sort(sortByValue())}
                    closedLeads={leads.closed.sort(sortByValue())}
                />
            </Card>
        </>
    );
};

export default LeadInfo;
