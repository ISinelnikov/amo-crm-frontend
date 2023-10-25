import cn from "classnames";
import styles from "../../screens/Manager/StatusDetails/StatusDetails.module.css";
import Dropdown from "../Dropdown";
import React, {useEffect, useState} from "react";
import ApiUtil from "../../service/ApiUtil";

const PipelineDropdown = ({onChange}) => {
    const [pipelines, setPipelines] = useState([]);
    const [active, setActive] = useState(null);

    useEffect(() => {
        ApiUtil.getPipelineDetails()
            .then(body => {
                setPipelines(body.pipelines);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (pipelines.length > 0 && active === null) {
            const pipeline = pipelines[0];
            setActive(pipeline);
            onChange(pipeline.pipelineId);
        }
    }, [pipelines])

    return (
        <Dropdown
            className={cn(styles.dropdown, "mobile-hide")}
            classDropdownHead={styles.dropdownHead}
            value={active}
            setValue={value => {
                setActive(value);
                onChange(value.pipelineId);
            }}
            options={pipelines}
            small
        />
    );
}

export default PipelineDropdown;