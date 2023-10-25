import cn from "classnames";
import styles from './Sort.module.css';
import React, {useEffect, useState} from "react";
import {NONE, ASC, DESC} from "../../service/DataUtils";

import none from './Resource/sort-disabled.png';
import asc from './Resource/sort-asc.png';
import desc from './Resource/sort-desc.png';


const values = [NONE, ASC, DESC];

const Sort = ({setType}) => {
    const [orderId, setOrderId] = useState(0);

    useEffect(() => setType(values[orderId]), [orderId]);

    const getIcon = () => {
        if (orderId === 1) {
            return <img className={cn(styles.icon)} src={asc} alt={`${values[orderId]}`}/>;
        }
        if (orderId === 2) {
            return <img className={cn(styles.icon)} src={desc} alt={`${values[orderId]}`}/>;
        }
        return <img className={cn(styles.icon)} src={none} alt={`${values[orderId]}`}/>;
    }

    return (
        <button className={cn(styles.button, {[styles.enabled]: orderId !== 0})}
                onClick={() => setOrderId((orderId) => (orderId + 1) % 3)}>
            {getIcon()}
        </button>
    )
}

export default Sort;