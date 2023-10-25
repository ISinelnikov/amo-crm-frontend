import React, {useEffect, useState} from "react";
import cn from "classnames";
import styles from "./IntegrationSettings.module.css";
import Item from "../../Item";
import IntegrationCard from "../../../../components/IntegrationCard";
import ApiUtil from "../../../../service/ApiUtil";

const IntegrationSettings = ({className}) => {
    const [integrations, setIntegrations] = useState([]);

    useEffect(() => {
        ApiUtil.getIntegrationSettings()
            .then(integrations => {
                setIntegrations(integrations)
            })
            .catch(error => console.log(error));
    }, [])

    return (
        <Item
            className={cn(styles.card, className)}
            title="Интеграции"
            classTitle="title-purple"
        >
            <div className={styles.cards}>
                {integrations && integrations.map((integration, index) => (
                <IntegrationCard
                    key={index}
                    logo={integration.iconPath}
                    name={integration.integrationName}
                    description={integration.integrationDescription}
                    active={integration.enabled}
                    detailsApiPath={integration.detailsApiPath}
                    initialApiPath={integration.initialApiPath}
                />
                ))}
            </div>
        </Item>
    );
};

export default IntegrationSettings;
