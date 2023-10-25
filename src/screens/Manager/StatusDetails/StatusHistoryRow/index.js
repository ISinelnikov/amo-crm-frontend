import React from "react";
import cn from "classnames";
import styles from "./StatusHistoryRow.module.css";
import {format} from "date-fns";

const StatusHistoryRow = ({ className, rows }) => {
  return (
    <>
      <div className={cn(styles.history, className)}>
        <div className={styles.inner}>
          <div className={styles.table}>
            <div className={styles.row}>
              <div className={styles.col}>Сделка</div>
              <div className={styles.col}>Дата создания</div>
              <div className={styles.col}>Дата изменения</div>
              <div className={styles.col}>Менеджер</div>
              <div className={styles.col}>Перемещена из воронки</div>
              <div className={styles.col}>Перемещена из статуса</div>
              <div className={styles.col}>Перемещена в воронку</div>
              <div className={styles.col}>Перемещена в статус</div>
            </div>
            {rows && rows.map((x, index) => (
              <div className={styles.row} key={index}>
                <div className={styles.col}>
                  <div>{x.leadId}</div>
                </div>
                <div className={styles.col}>
                  <div className={styles.date}>
                    {format(new Date(x.dateCreate), 'dd-MM-yyyy HH:mm:ss')}
                  </div>
                </div>
                <div className={styles.col}>
                  <div className={styles.date}>
                    {format(new Date(x.dateUpdate), 'dd-MM-yyyy HH:mm:ss')}
                  </div>
                </div>
                <div className={styles.col}>
                  <div>{x.name}</div>
                </div>
                <div className={styles.col}>
                  <div>{x.fromPipeline}</div>
                </div>
                <div className={styles.col}>
                  <div>{x.fromStatus}</div>
                </div>
                <div className={styles.col}>
                  <div>{x.toPipeline}</div>
                </div>
                <div className={styles.col}>
                  <div>{x.toStatus}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default StatusHistoryRow;
