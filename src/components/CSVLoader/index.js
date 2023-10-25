import cn from "classnames";
import styles from "./CSVLoader.module.css";
import {CSVLink} from "react-csv";
import Icon from "../Icon";
import React from "react";

const CSVLoader = ({headers, data, filename}) => {
    return (
        <button className={cn(styles.button)}>
            <CSVLink headers={headers} data={data} filename={filename}>
                <Icon name="download" size="26"/>
            </CSVLink>
        </button>
    )
}

export default CSVLoader;