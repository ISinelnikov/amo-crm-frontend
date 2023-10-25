import React, {useState} from "react";
import cn from "classnames";
import styles from "./Dropdown.module.css";
import {NavLink, useLocation} from "react-router-dom";
import Icon from "../../Icon";

const Dropdown = ({ className, item, visibleSidebar, setValue, onClose }) => {
  const [visible, setVisible] = useState(false);

  const { pathname } = useLocation();

  const handleClick = () => {
    setVisible(!visible);
    setValue(true);
  };

  const Head = () => {
    return (
      <button
        className={cn(
          styles.head,
          {
            [styles.active]: pathname.includes(item.slug),
          },
          { [styles.wide]: visibleSidebar }
        )}
        onClick={() => handleClick()}
      >
        <Icon name={item.icon} size="24" />
        {item.title}
        <Icon name="arrow-down" size="24" />
      </button>
    );
  };

  return (
    <div
      className={cn(
        styles.dropdown,
        className,
        { [styles.active]: visible },
        {
          [styles.active]: pathname.includes(item.slug),
        },
        { [styles.wide]: visibleSidebar }
      )}
    >

        <Head />
      <div className={styles.body}>
        {item.dropdown.map((x, index) => (
          <NavLink
            className={({ isActive }) => cn(isActive ? styles.active : {},
                styles.link)}
            to={x.url}
            key={index}
            onClick={onClose}
          >
            {x.title}
            {x.counter ? (
              <div
                className={styles.counter}
                style={{ backgroundColor: x.colorCounter }}
              >
                {x.counter}
              </div>
            ) : (
              <Icon name="arrow-next" size="24" />
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
