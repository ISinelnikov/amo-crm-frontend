import React, {useContext, useEffect, useState} from "react";
import styles from "./PipelineInfo.module.css";
import Card from "../../../components/Card";
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import DarkModeContext from "../../../context/DarkMode/Context";
import DatePickerInterval from "../../../components/DatePicker/DatePickerInterval";
import {formatInterval} from "../../../service/DateService";
import ApiUtil from "../../../service/ApiUtil";
import PipelineDropdown from "../../../components/PipelineDropdown";
import {sortByOrderId} from "../../../service/DataUtils";

const PipelineInfo = () => {
    const [darkMode] = useContext(DarkModeContext);

    const [interval, setInterval] = useState({});

    const [pipelineId, setPipelineId] = useState(null);
    const [pipelineInfoItems, setPipelineInfoItems] = useState([]);

    useEffect(() => {
        if (pipelineId !== null) {
            const {from, to} = formatInterval(interval);
            ApiUtil.getDashboardPipelineInfo(from, to, pipelineId)
                .then(body => setPipelineInfoItems(body))
                .catch(error => {
                    console.log(error);
                });
        } else {
            setPipelineInfoItems([]);
        }
    }, [interval, pipelineId]);

    return (
        <Card className={styles.card}
              title={'Статусы'}
              classTitle="title-purple"
              head={
                  <div className={styles.filter}>
                      <PipelineDropdown onChange={setPipelineId}/>
                      <DatePickerInterval onChange={setInterval}/>
                  </div>
              }>
            <div className={styles.chart} style={{height: `${pipelineInfoItems.length * 45}px`}}>

                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={400}
                        data={pipelineInfoItems.sort(sortByOrderId())}
                        layout="vertical"
                        margin={{
                            top: 0,
                            right: 0,
                            left: 100,
                            bottom: 0,
                        }}
                        barSize={26}
                        barGap={8}
                    >
                        <CartesianGrid
                            strokeDasharray="none"
                            stroke={darkMode ? "#272B30" : "#EFEFEF"}
                            horizontal={false}
                        />
                        <XAxis
                            type="number"
                            axisLine={false}
                            tickLine={false}
                            tick={{fontSize: 12, fontWeight: "500", fill: darkMode ? '#EFEFEF' : '#1A1D1F'}}
                            padding={{left: 10}}
                        />
                        <YAxis
                            type="category"
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{fontSize: 14, fontWeight: "500", fill: darkMode ? '#EFEFEF' : '#1A1D1F'}}
                        />
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
                            cursor={{fill: "#f3f2f3"}}
                        />
                        <Bar dataKey="leads" onClick={data => {
                            window.open("/leads?pipelineId=" + pipelineId
                                + "&statusId=" + data.statusId, {replace: true});
                        }} fill="#B5E4CA"/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

export default PipelineInfo;
