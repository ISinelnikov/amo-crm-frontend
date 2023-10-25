import React, {useRef, useState} from "react";
import cn from "classnames";
import styles from "../Settings.module.css";
import Dropdown from "../../../components/Dropdown";
import ProfileSettings from "./ProfileSettings";
import PasswordSettings from "./PasswordSettings";
import TwoFactorSettings from "./TwoFactorSettings";

const PersonalSettings = () => {
  const navigation = [
    {
      title: "Профиль",
      action: () =>
        scrollToProfileSettings.current.scrollIntoView({ behavior: "smooth" }),
    },
    {
      title: "Пароль",
      action: () =>
        scrollToPasswordSettings.current.scrollIntoView({ behavior: "smooth" }),
    },
    {
      title: "Двухфактроная аутентификация",
      action: () =>
        scrollToTwoFactorSettings.current.scrollIntoView({ behavior: "smooth" }),
    }
  ];
  const options = [];
  navigation.map((x) => options.push(x.title));
  const [activeTab, setActiveTab] = useState(options[0]);

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollToProfileSettings = useRef(null);
  const scrollToPasswordSettings = useRef(null);
  const scrollToTwoFactorSettings = useRef(null);

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
              <div className={styles.anchor} ref={scrollToProfileSettings}></div>
              <ProfileSettings />
            </div>
            <div
              className={cn(styles.item, {
                [styles.active]: activeTab === options[1],
              })}
            >
              <div className={styles.anchor} ref={scrollToPasswordSettings}></div>
              <PasswordSettings />
            </div>
            <div
              className={cn(styles.item, {
                [styles.active]: activeTab === options[2],
              })}
            >
              <div className={styles.anchor} ref={scrollToTwoFactorSettings}></div>
              <TwoFactorSettings />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalSettings;
