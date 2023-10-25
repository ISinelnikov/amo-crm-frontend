import React from "react";
import styles from "./DealsRow.module.css";
import cn from "classnames";

const DealsRow = ({ className, activeTable, deals }) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={cn(styles.table)}>
        <div className={cn(styles.row, { [styles.active]: activeTable })}>
          <div className={styles.col}>Имя</div>
          <div className={styles.col}>Встреч<br/>назначено</div>
          <div className={styles.col}>Встреч<br/>состоялось</div>
          <div className={styles.col}>Договоров<br/>заключено</div>
          <div className={styles.col}>Выручка</div>
        </div>
        {deals.map((x, index) => (
            <div className={cn(styles.row)} key={index}>
              <div className={styles.col}>
                <div className={styles.user}>{x.name}</div>
              </div>
              <div className={styles.col}>
                {x.preparedMeets}
              </div>
              <div className={styles.col}>
                {x.completedMeets}
              </div>
              <div className={styles.col}>
                {x.deals}
              </div>
              <div className={styles.col}>
                {x.profit}.00&#8381;
              </div>
            </div>

        ))}
      </div>
    </div>
  );
};

export default DealsRow;
