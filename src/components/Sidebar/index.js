import React, {useState} from "react";
import styles from "./Sidebar.module.css";
import {Link, NavLink} from "react-router-dom";
import cn from "classnames";
import Icon from "../Icon";
import Theme from "../Theme";
import Dropdown from "./Dropdown";
import Image from "../Image";

const navigation = [
    {
        title: "Квалификации и источники",
        icon: "home",
        url: '/dashboard',
    },
    {
        title: "Воронки продаж",
        icon: "grid",
        url: "/pipeline",
    },
    {
        title: "Сделки",
        icon: "diamond",
        url: "/leads",
    },
    {
        title: "Встречи и продажи",
        icon: "profile-circle",
        url: "/deals",
    }
];

const Sidebar = ({className, onClose}) => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <div
                className={cn(styles.sidebar, className, {[styles.active]: visible})}
            >
                <button className={styles.close} onClick={onClose}>
                    <Icon name="close" size="24"/>
                </button>
                <div className={styles.header}>
                    <Link className={styles.logo} to="/" onClick={onClose}>
                        <Image
                            className={styles.pic}
                            src="/images/logo-dark.svg"
                            srcDark="/images/logo-light.svg"
                            alt="OSS"
                        />
                    </Link>
                </div>
                <div className={styles.menu}>
                    {navigation.map((x, index) =>
                        x.url ? (
                            <NavLink
                                className={({isActive}) => cn(isActive ? styles.active : {}, styles.link)}
                                to={x.url}
                                key={index}
                                onClick={onClose}
                            >
                                <Icon name={x.icon} size="24"/>
                                {x.title}
                            </NavLink>
                        ) : (
                            <Dropdown
                                className={styles.dropdown}
                                visibleSidebar={visible}
                                setValue={setVisible}
                                key={index}
                                item={x}
                                onClose={onClose}
                            />
                        )
                    )}
                </div>
                <button className={styles.toggle} onClick={() => setVisible(!visible)}>
                    <Icon name="arrow-right" size="24"/>
                    <Icon name="close" size="24"/>
                </button>
                <div className={styles.foot}>
                    <div className={styles.link}>
                        <a href={'https://t.me/orderstat_support_bot'} target='_blank' rel="noopener noreferrer">Техническая Поддержка (Telegram)</a>
                    </div>
                    <Theme className={styles.theme} visibleSidebar={visible}/>
                </div>
            </div>
            <div
                className={cn(styles.overlay, {[styles.active]: visible})}
                onClick={() => setVisible(false)}
            ></div>
        </>
    );
};

export default Sidebar;
