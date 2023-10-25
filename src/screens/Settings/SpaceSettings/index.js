import React, {useRef, useState} from "react";
import cn from "classnames";
import styles from "../Settings.module.css";
import Dropdown from "../../../components/Dropdown";
import CommonSettings from "./CommonSettings";
import AdditionalAccountSettings from "./AdditionalAccountSettings";
import IntegrationSettings from "./IntegrationSettings";

const SpaceSettings = () => {
    const navigation = [
        {
            title: "Общая информация",
            action: () =>
                scrollToCommon.current.scrollIntoView({ behavior: "smooth" }),
        },
        {
            title: "Пользователи",
            action: () =>
                scrollToAdditionalAccount.current.scrollIntoView({ behavior: "smooth" }),
        },
        {
            title: "Интеграции",
            action: () =>
                scrollToIntegrationSettings.current.scrollIntoView({ behavior: "smooth" }),
        }
    ];
    const options = [];
    navigation.map((x) => options.push(x.title));
    const [activeTab, setActiveTab] = useState(options[0]);

    const [activeIndex, setActiveIndex] = useState(0);
    const scrollToCommon = useRef(null);
    const scrollToAdditionalAccount = useRef(null);
    const scrollToIntegrationSettings = useRef(null);

    const handleClick = (x, index) => {
        setActiveIndex(index);
        x.action();
    };
    return (
        <>
            <div className={styles.settings}>
                <div className={styles.menu}>
                    {navigation.map((x, index) => (
                        <button
                            className={cn(styles.button, {
                                [styles.active]: activeIndex === index,
                            })}
                            key={index}
                            onClick={() => handleClick(x, index)}
                        >
                            {x.title}
                        </button>
                    ))}
                </div>
                <div className={styles.wrapper}>
                    <Dropdown
                        className={styles.dropdown}
                        classDropdownHead={styles.dropdownHead}
                        value={activeTab}
                        setValue={setActiveTab}
                        options={options}
                    />
                    <div className={styles.list}>
                        <div
                            className={cn(styles.item, {
                                [styles.active]: activeTab === options[0],
                            })}
                        >
                            <div className={styles.anchor} ref={scrollToCommon}></div>
                            <CommonSettings />
                        </div>
                        <div
                            className={cn(styles.item, {
                                [styles.active]: activeTab === options[1],
                            })}
                        >
                            <div className={styles.anchor} ref={scrollToAdditionalAccount}></div>
                            <AdditionalAccountSettings />
                        </div>
                        <div
                            className={cn(styles.item, {
                                [styles.active]: activeTab === options[2],
                            })}
                        >
                            <div className={styles.anchor} ref={scrollToIntegrationSettings}></div>
                            <IntegrationSettings />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SpaceSettings;
