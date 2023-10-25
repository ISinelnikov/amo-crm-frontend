import React, {useContext, useEffect, useState} from "react";
import {Cell, Label, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import styles from "./PieChartCollection.module.css";
import DarkModeContext from "../../context/DarkMode/Context";
import prepareLegendAndColors from "../../service/ChartService";
import Checkbox from "../Checkbox";

const PieChartCollection = ({allLeads, qualifiedLeads, closedLeads}) => {
    const [darkMode] = useContext(DarkModeContext);

    const [legendFilter, setLegendFilter] = useState(new Map());

    useEffect(() => {
        const legendFilterDefault = new Map();
        allLeads.forEach(value => legendFilterDefault.set(value.name, true));
        setLegendFilter(legendFilterDefault);
    }, [allLeads]);

    const updateFilter = (key, value) => {
        setLegendFilter(map => new Map(map.set(key, value)));
    }

    const emptyPie = () => {
        return (
            <Pie
                data={[{name: 'Not Found', value: 1}]}
                cx={140}
                cy={110}
                innerRadius={88}
                outerRadius={110}
                fill="#8884d8"
                paddingAngle={1}
                dataKey="value"
            >
                <Cell key={`cell-0`} fill="#f3f6f9"/>;
                <Label value={'0'} position="center" className={'label'}
                       style={{fill: darkMode ? '#EFEFEF' : '#1A1D1F', fontSize: '50px'}}
                />
            </Pie>
        )
    }

    const prepareLeadPieChart = (chartTitle, leadData) => {
        const filteredLeadData = leadData.filter(data => legendFilter.get(data.name));
        const legendAndColors = prepareLegendAndColors(filteredLeadData);
        const filteredCount = filteredLeadData.reduce((partialSum, value) => partialSum + value.value, 0);
        return (
            <div className={styles.chart}>
                <div className={styles.chartTitle}>{chartTitle}</div>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={400} height={400}>
                        {filteredCount && <Tooltip
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
                        }
                        {filteredCount === 0 ? emptyPie() :
                            <Pie
                                data={filteredLeadData}
                                cx={140}
                                cy={110}
                                innerRadius={88}
                                outerRadius={110}
                                fill="#8884d8"
                                paddingAngle={1}
                                dataKey="value"
                            >
                                {filteredLeadData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={legendAndColors.colors[index % legendAndColors.colors.length]}
                                    />
                                ))}
                                <Label value={filteredCount} position="center" className={'label'}
                                       style={{fill: darkMode ? '#EFEFEF' : '#1A1D1F', fontSize: '50px'}}
                                />
                            </Pie>
                        }
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );
    }

    return (
        <>
            <div className={styles.chartWrapper}>
                {prepareLeadPieChart('Всего', allLeads)}
                {prepareLeadPieChart('Квалифицировано', qualifiedLeads)}
                {prepareLeadPieChart('Отказ', closedLeads)}
            </div>
            <div className={styles.legend}>
                {prepareLegendAndColors(allLeads).legend.map((x, index) => (
                    <div className={styles.indicator} key={index}>
                        <Checkbox value={legendFilter.get(x.title)}
                                  onChange={value => updateFilter(x.title, value)}
                                  color={x.color}
                        />
                        {x.title}
                    </div>
                ))}
            </div>
        </>
    );
}

export default PieChartCollection;


