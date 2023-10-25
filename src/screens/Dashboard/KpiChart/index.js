import React, {useEffect, useState} from "react";
import styles from "./KpiChart.module.css";
import cn from "classnames";
import Card from "../../../components/Card";
import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import prepareLegendAndColors from "../../../service/ChartService";
import ApiUtil from "../../../service/ApiUtil";
import {formatInterval, getFirstAndLastMonthDays} from "../../../service/DateService";
import CommonFilter from "../../../components/CommonFilter";

const KpiChart = ({className}) => {
    const [filter, setFilter] = useState({
        selectedPipelineId: null,
        selectedMonth: new Date()
    });

    const [leadsKpi, setLeadsKpi] = useState(
        {leads: 0, leadsRequired: 0, qualifiedLeads: 0, qualifiedLeadsRequired: 0}
    );

    const data = [
        {name: 'Сделок квалифицировано'},
        {name: 'Осталось квалифицировать'},
        {name: 'Сделок создано'},
        {name: 'Осталось создать'}
    ];

    useEffect(() => {
        const {selectedPipelineId: pipelineId, selectedMonth: month} = filter;
        if (pipelineId !== null && month !== null) {
            const {from, to} = formatInterval(getFirstAndLastMonthDays(month));
            ApiUtil.getDashboardLeadsKpiDetails(from, to, pipelineId)
                .then(body => {
                    setLeadsKpi(body);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }, [filter]);

    const legendAndColors = prepareLegendAndColors(data);

    const percent = (count, all) => count === 0 && all === 0
        ? 0
        : ((count / all) * 100).toFixed(2);

    const getTimeProgress = () => {
        let today = new Date();
        const date = filter.selectedMonth === null ? new Date() : filter.selectedMonth;

        if (today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth()) {
            const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            return (
                <>
                    <span className={styles.noteTitle}>
                        День {today.getDate()} из {lastDayOfMonth.getDate()}
                    </span>
                    <span className={styles.note}>
                        Сделок создано {leadsKpi.leads} из {leadsKpi.leadsRequired}.
                        План выполнен на {percent(leadsKpi.leads, leadsKpi.leadsRequired)}%.
                    </span>
                    <span className={styles.note}>
                        Сделок квалифицировано {leadsKpi.qualifiedLeads} из {leadsKpi.qualifiedLeadsRequired}.
                        План выполнен на {percent(leadsKpi.qualifiedLeads, leadsKpi.qualifiedLeadsRequired)}%.
                    </span>
                </>
            )
        } else {
            const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            if (today.getFullYear() <= date.getFullYear() && today.getMonth() <= date.getMonth()) {
                return (
                    <>
                        <span className={styles.noteTitle}>
                            День 0 из {lastDayOfMonth.getDate()}
                        </span>
                        <span className={styles.note}>
                            План по сделкам еще не создан.
                        </span>
                        <span className={styles.note}>
                            План по квалификациям еще не создан.
                        </span>
                    </>
                )
            } else {
                return (
                    <>
                        <span className={styles.noteTitle}>
                            День {lastDayOfMonth.getDate()} из {lastDayOfMonth.getDate()}
                        </span>
                        <span className={styles.note}>
                            Сделок создано {leadsKpi.leads} из {leadsKpi.leadsRequired}.
                            План выполнен на {percent(leadsKpi.leads, leadsKpi.leadsRequired)}%.
                        </span>
                        <span className={styles.note}>
                            Сделок квалифицировано {leadsKpi.qualifiedLeads} из {leadsKpi.qualifiedLeadsRequired}.
                            План выполнен на {percent(leadsKpi.qualifiedLeads, leadsKpi.qualifiedLeadsRequired)}%.
                        </span>
                    </>
                )
            }
        }
    }

    return (
        <Card
            className={cn(styles.card, className)}
            title="Итог за месяц"
            classTitle="title-purple"
        >
            <div className={styles.header}>
                <CommonFilter pipeline={true} month={true} onChange={setFilter}/>
            </div>
            <div className={styles.chart}>
                <div className={styles.chartTitle}>
                    {getTimeProgress()}
                </div>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={400} height={400}>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#272B30",
                                borderColor: "rgba(255, 255, 255, 0.12)",
                                borderRadius: 8,
                                boxShadow:
                                    "0px 4px 8px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.1), inset 0px 0px 1px #000000",
                            }}
                            labelStyle={{fontSize: 12, fontWeight: "500", color: "#fff"}}
                            itemStyle={{
                                padding: 0,
                                textTransform: "capitalize",
                                fontSize: 12,
                                fontWeight: "600",
                                color: "#fff",
                            }}
                        />
                        <Pie
                            data={[
                                {name: data[2].name, value: leadsKpi.leads},
                                {
                                    name: data[3].name, value: leadsKpi.leadsRequired - leadsKpi.leads > 0
                                        ? leadsKpi.leadsRequired - leadsKpi.leads : 0
                                }
                            ]}
                            cx={140}
                            cy={110}
                            innerRadius={88}
                            outerRadius={110}
                            fill="#8884d8"
                            paddingAngle={1}
                            dataKey="value"
                        >
                            <Cell
                                key={`cell-${0}`}
                                fill={legendAndColors.colors[2]}
                            />
                            <Cell
                                key={`cell-${1}`}
                                fill={legendAndColors.colors[3]}
                            />
                        </Pie>
                        <Pie data={
                            [
                                {name: data[0].name, value: leadsKpi.qualifiedLeads},
                                {
                                    name: data[1].name,
                                    value: leadsKpi.qualifiedLeadsRequired - leadsKpi.qualifiedLeads > 0
                                        ? leadsKpi.qualifiedLeadsRequired - leadsKpi.qualifiedLeads : 0
                                }
                            ]
                        } dataKey="value" cx={140}
                             cy={110} innerRadius={48} outerRadius={70} fill="#8884d8">
                            <Cell
                                key={`cell-${0}`}
                                fill={legendAndColors.colors[0]}
                            />
                            <Cell
                                key={`cell-${1}`}
                                fill={legendAndColors.colors[1]}
                            />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className={styles.legend}>
                <div className={styles.indicator}>
                    <div
                        className={styles.color}
                        style={{backgroundColor: legendAndColors.colors[2]}}
                    ></div>
                    {data[2].name}
                </div>

                <div className={styles.indicator}>
                    <div
                        className={styles.color}
                        style={{backgroundColor: legendAndColors.colors[3]}}
                    ></div>
                    {data[3].name}
                </div>

                <div className={styles.indicator}>
                    <div
                        className={styles.color}
                        style={{backgroundColor: legendAndColors.colors[0]}}
                    ></div>
                    {data[0].name}
                </div>

                <div className={styles.indicator}>
                    <div
                        className={styles.color}
                        style={{backgroundColor: legendAndColors.colors[1]}}
                    ></div>
                    {data[1].name}
                </div>
            </div>
        </Card>
    );
};

export default KpiChart;
