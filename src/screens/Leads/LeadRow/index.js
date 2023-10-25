import React, {useState} from "react";
import cn from "classnames";
import styles from "./LeadRow.module.css";
import {format} from "date-fns";
import Sort from "../../../components/Sort";
import {NONE, sortByFilters} from "../../../service/DataUtils";

const LeadRow = ({className, rows}) => {
    const [filters, setFilters] = useState([
        {key: "status", type: NONE},
        {key: "source", type: NONE}
    ]);

    const openInNewTab = (url) => {
        window.open(url, "_blank", "noreferrer");
    };

    return (
        <>
            <div className={cn(styles.history, className)}>
                <div className={styles.inner}>
                    <div className={styles.table}>
                        <div className={cn(styles.row, styles.header)}>
                            <div className={styles.col}>
                                ID
                            </div>
                            <div className={styles.col}>
                                Дата создания
                            </div>
                            <div className={styles.col}>
                                Название
                            </div>
                            <div className={styles.col}>
                                Воронка
                            </div>
                            <div className={styles.col}>

                                <div className={styles.sort}>
                                    Статус
                                    {' '}
                                    <Sort setType={type => {
                                        setFilters([
                                            {
                                                key: filters[0].key,
                                                type: type
                                            },
                                            filters[1]
                                        ])
                                    }}/>
                                </div>
                            </div>
                            <div className={styles.col}>
                                <div className={styles.sort}>
                                    Источник
                                    {' '}
                                    <Sort setType={type => {
                                        setFilters([
                                            filters[0],
                                            {
                                                key: filters[1].key,
                                                type: type
                                            }
                                        ])
                                    }}/>
                                </div>
                            </div>
                            <div className={styles.col}>
                                Квалификация
                            </div>
                            <div className={styles.col}>
                                Состояние
                            </div>
                        </div>
                        {rows && sortByFilters(rows, filters).map((x, index) => (
                            <div className={styles.row} key={index} onClick={() => openInNewTab(x.link)}>
                                <div className={styles.col}>
                                    <div className={styles.deal}>
                                        <div>{x.leadId}</div>
                                    </div>
                                </div>
                                <div className={styles.col}>
                                    <div className={styles.date}>
                                        {format(new Date(x.createdDate), 'dd-MM-yyyy HH:mm:ss')}
                                    </div>
                                </div>
                                <div className={styles.col}>
                                    <div>{x.name}</div>
                                </div>
                                <div className={styles.col}>
                                    <div>{x.pipeline}</div>
                                </div>
                                <div className={styles.col}>
                                    <div>{x.status}</div>
                                </div>
                                <div className={styles.col}>
                                    <div>{x.source}</div>
                                </div>
                                <div className={styles.col}>
                                    <div>{x.qualifiedTooltip}</div>
                                </div>
                                <div className={styles.col}>
                                    <div>{x.closedTooltip}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeadRow;
