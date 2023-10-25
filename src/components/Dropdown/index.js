import React, {useState} from "react";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./Dropdown.module.css";

const Dropdown = ({
                      className,
                      classDropdownHead,
                      classDropdownLabel,
                      value,
                      setValue,
                      emptyValue,
                      options,
                      label,
                      small,
                      upBody,
                      disabled = false,
                      placehodler = ''
                  }) => {
    const [visible, setVisible] = useState(false);

    const handleClick = (value) => {
        setValue(value);
        setVisible(false);
    };

    return (
        <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
            {label && (
                <div className={cn(styles.label, classDropdownLabel)}>
                    {label}{" "}
                </div>
            )}
            <div disabled={disabled}
                 className={cn(
                     className,
                     styles.dropdown,
                     {[styles.small]: small},
                     {
                         [styles.active]: visible,
                     }
                 )}
            >
                <div
                    className={cn(styles.head, classDropdownHead)}
                    onClick={() => setVisible(!visible)}
                >
                    <div className={styles.selection}>{value ? value.name : placehodler}</div>
                </div>
                <div className={cn(styles.body, {[styles.bodyUp]: upBody})}>
                    {emptyValue &&
                        <div className={cn(styles.option)} onClick={() => handleClick(null)}>
                            <div className={styles.empty}>N/A</div>
                        </div>
                    }

                    {options.map((x, index) => (
                        <div
                            className={cn(styles.option, {
                                [styles.selectioned]: x === value,
                            })}
                            onClick={() => handleClick(x)}
                            key={index}
                        >
                            {x.name}
                        </div>
                    ))}
                </div>
            </div>
        </OutsideClickHandler>
    );
};

export default Dropdown;
