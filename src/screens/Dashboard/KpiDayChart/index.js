import React, {useContext, useEffect, useState} from "react";
import DarkModeContext from '../../../context/DarkMode/Context';
import styles from "./KpiDayChart.module.css";
import cn from "classnames";
import Card from "../../../components/Card";
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,} from "recharts";
import {formatInterval} from "../../../service/DateService";
import ApiUtil from "../../../service/ApiUtil";
import CustomTooltip from "./CustomTooltip";
import Checkbox from "../../../components/Checkbox";
import CommonFilter from "../../../components/CommonFilter";

const legend = [
    {
        title: "Планируется создать",
        color: "#FFBC99",
    },
    {
        title: "Создано",
        color: "#CABDFF",
    },
    {
        title: "Планируется квалифицировать",
        color: "#2A85FF",
    },
    {
        title: "Квалифицировано",
        color: "#B1E5FC",
    },
];

const KpiDayChart = ({className}) => {
    const [darkMode] = useContext(DarkModeContext);

    const [legendFilter, setLegendFilter] = useState([true, true, true, true]);

    const [filter, setFilter] = useState({
        selectedPipelineId: null,
        selectedInterval: {}
    });

    const [data, setData] = useState([]);

    useEffect(() => {
        const {selectedPipelineId : pipelineId, selectedInterval : interval} = filter;
        if (pipelineId !== null && interval !== null) {
            const {from, to} = formatInterval(interval);
            ApiUtil.getDashboardLeadsKpiDetailsDay(from, to, pipelineId)
                .then(body => {
                    setData(body);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [filter]);

    return (
        <Card
            className={cn(styles.card, className)}
            title="Итог за день"
            classTitle="title-purple"
            head={
                <CommonFilter pipeline={true} interval={true} onChange={setFilter}/>
            }
        >
            <div className={styles.chart}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                        }}
                        barSize={20}
                        barGap={8}
                    >
                        <CartesianGrid
                            strokeDasharray="none"
                            stroke={darkMode ? "#272B30" : "#EFEFEF"}
                            vertical={false}
                        />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{fontSize: 12, fontWeight: "500", fill: "#6F767E"}}
                            padding={{left: 10}}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{fontSize: 12, fontWeight: "500", fill: "#6F767E"}}
                        />
                        <Tooltip content={<CustomTooltip/>}
                                 cursor={{fill: "#f3f2f3"}}
                        />
                        {legendFilter[0] && <Bar dataKey="leadsRequired" stackId="a" fill="#FFBC99"/>}
                        {legendFilter[1] && <Bar dataKey="leads" stackId="b" fill="#CABDFF"/>}
                        {legendFilter[2] && <Bar dataKey="qualifiedLeadsRequired" stackId="c" fill="#2A85FF"/>}
                        {legendFilter[3] && <Bar dataKey="qualifiedLeads" stackId="d" fill="#B1E5FC"/>}
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className={styles.legend}>
                {legend.map((x, index) => (
                    <div className={styles.indicator} key={index}>
                        <Checkbox value={legendFilter[index]} onChange={value => {
                            const shallowCopy = [...legendFilter];
                            shallowCopy[index] = value;
                            setLegendFilter(shallowCopy);
                        }} color={x.color}/>
                        {x.title}
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default KpiDayChart;
