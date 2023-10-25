import React from "react";
import styles from "./Dashboard.module.css";
import LeadInfo from "./LeadInfo";
import KpiChart from "./KpiChart";
import KpiDayChart from "./KpiDayChart";

const Dashboard = () => {
    return (
        <div>
            <LeadInfo className={styles.card}/>
            <div className={styles.row}>
                <div className={styles.col}>
                    <KpiDayChart className={styles.card}/>
                </div>
                <div className={styles.col}>
                    <KpiChart className={styles.card}/>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
