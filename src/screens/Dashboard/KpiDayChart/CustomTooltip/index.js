import React from "react";
import styles from './CustomTooltip.module.css';

const CustomTooltip = ({ active, payload, label }) => {
    const name = (value) => {
        if (value === 'leadsRequired') {
            return 'Планируется создать:';
        }
        if (value === 'leads') {
            return 'Создано:';
        }
        if (value === 'qualifiedLeadsRequired') {
            return 'Планируется квалифицировать:';
        }
        if (value === 'qualifiedLeads') {
            return 'Квалифицировано:';
        }
        return '';
    }

    if (active && payload && payload.length) {
        return (
            <div className={styles.customTooltip}>
                <p>{`Итог за ${label}`}</p>
                <div>
                    {payload.map((pld, idx) => (
                        <div key={idx}>
                            <div style={{ color: pld.fill }}>
                                {`${name(pld.dataKey)} ${pld.value}`}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return null;
};

export default CustomTooltip;