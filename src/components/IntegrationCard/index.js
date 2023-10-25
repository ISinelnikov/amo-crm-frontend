import styles from './IntegrationCard.module.css'
import cn from "classnames";
import {useEffect, useState} from "react";
import ApiUtil from "../../service/ApiUtil";

const IntegrationCard = ({logo, name, description, active, initialApiPath, detailsApiPath}) => {
    const [integrationSettings, setIntegrationSettings] = useState({
        connected: null
    });

    useEffect(() => {
        if (detailsApiPath) {
            ApiUtil.invokeIntegrationApiPath(detailsApiPath)
                .then(body => {
                    console.log(name, body);
                    setIntegrationSettings(body);
                })
                .catch(error => console.log(error));
        }
    }, [active, detailsApiPath, name])

    const openIntegration = () => {
        if (initialApiPath) {
            ApiUtil.invokeIntegrationApiPath(initialApiPath)
                .then(body => {
                    if (body.url) {
                        window.open(body.url, '_blank', 'noopener,noreferrer');
                    }
                })
                .catch(error => console.log(error))
        }
    }

    const prepareButton = () => {
        if (!active) {
            return (
                <button className={cn("button", styles.button, {disabled: !active})}>
                    Интеграция в разработке
                </button>
            )
        }
        if (active && integrationSettings.connected !== null) {
            if (integrationSettings.connected) {
                return (
                    <button className={cn("button", styles.button, {disabled: true})}>
                        Интеграция подключена
                    </button>
                )
            } else {
                return (
                    <button onClick={openIntegration}
                            className={cn("button", styles.button, {disabled: !active})}>
                        Подключить интеграцию
                    </button>
                )
            }
        }
    }

    return (
        <div className={styles.info}>
            <div className={styles.logo}>
                <img src={`images/integration/${logo}`} alt={name}/>
            </div>
            <div className={styles.content}>
                <div className={styles.name}>
                    {name}
                </div>
                <div className={styles.description}>
                    {description}
                </div>
                {prepareButton()}
            </div>
        </div>
    )
}

export default IntegrationCard;