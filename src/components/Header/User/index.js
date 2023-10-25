import React, {useContext, useEffect, useState} from "react";
import {Navigate, NavLink} from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.css";
import Icon from "../../Icon";
import LocalStorageSecurityUtils from "../../../service/LocalStorageService";
import ApiUtil from "../../../service/ApiUtil";
import UserProfileContext from "../../../context/UserProfile/Context";

const items = [
    {
        menu: [
            {
                title: "Тарифы и оплата",
                icon: "leaderboard",
                color: true,
                url: "/subscription",
            },
        ],
    },
    {
        menu: [
            {
                title: "Настройки профиля",
                url: "/profile-settings"
            },
            {
                title: "Настройки организации",
                url: "/organization-settings"
            },
            {
                title: "Выйти",
                action: () => {
                    LocalStorageSecurityUtils.removeSecurityToken();
                    window.location.reload();
                }
            }
        ],
    },
];

const User = ({className}) => {
    const [visible, setVisible] = useState(false);
    const [expired, setExpired] = useState(false);
    const [profile, setProfile] = useContext(UserProfileContext);

    useEffect(() => {
        ApiUtil.getProfile()
            .then(body => {
                setProfile(body);
            })
            .catch(error => {
                setExpired(true);
            })
    }, []);

    return (
        expired ? <Navigate to={'/'} replace/> :
            <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
                <div className={cn(styles.user, className, {[styles.active]: visible})}>
                    <div className={styles.profile}>
                        <div className={styles.personalInfo}>
                            <div>{profile ? profile.username : ''}</div>
                            <div>{profile ? profile.firstName : ''} {profile ? profile.lastName : ''}</div>
                        </div>
                        <button className={styles.head} onClick={() => setVisible(!visible)}>
                            {(profile ? profile.avatar : '')
                                ? <img src={`${profile.avatar}`} alt="Avatar"/>
                                : <img src="/images/content/avatar.png" alt="Avatar"/>
                            }
                        </button>
                    </div>
                    <div className={styles.body}>
                        {items.map((item, index) => (
                            <div className={styles.menu} key={index}>
                                {item.menu.map((x, index) =>
                                    x.url ? (
                                        <NavLink
                                            className={({isActive}) => cn(isActive ? styles.active : {},
                                                styles.item, {[styles.color]: x.color})}
                                            to={x.url}
                                            onClick={() => setVisible(false)}
                                            key={index}
                                        >
                                            {x.icon && <Icon name={x.icon} size="24"/>}
                                            {x.title}
                                        </NavLink>
                                    ) : (
                                        <button
                                            className={styles.item}
                                            onClick={() => {
                                                if (x.action) {
                                                    x.action();
                                                }
                                                setVisible(false);
                                            }}
                                            key={index}
                                        >
                                            {x.title}
                                        </button>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </OutsideClickHandler>
    );
};

export default User;
