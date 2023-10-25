import cn from "classnames";
import React, { useContext } from "react";
import Icon from "../Icon";
import DarkModeContext from '../../context/DarkMode/Context';
import styles from "./Theme.module.css";

const Theme = ({ className, visibleSidebar }) => {
  const [darkMode, toggleDarkMode] = useContext(DarkModeContext);

  return (
    <label
      className={cn(className, styles.theme, { [styles.wide]: visibleSidebar })}
    >
      <input
        className={styles.input}
        checked={darkMode}
        onChange={toggleDarkMode}
        type="checkbox"
      />
      <span className={styles.inner}>
        <span className={styles.box}>
          <Icon name="sun" size="24" />
          Light
        </span>
        <span className={styles.box}>
          <Icon name="moon" size="24" />
          Dark
        </span>
      </span>
    </label>
  );
};

export default Theme;
