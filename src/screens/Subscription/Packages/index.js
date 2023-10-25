import React from "react";
import cn from "classnames";
import styles from "./Packages.module.css";

const packages = [
    {
        title: "Базовый",
        classTitle: "title-blue",
        recommended: false,
        content: "Ознакомьтесь с базовыми возможностями системы",
        price: "Цена по запросу",
        classButton: "button-stroke",
        buttonText: "Текущий план",
        list: [
            "Подключите AmoCRM и собирайте аналитику в реальном времени",
            "Настраивайте графики и отчеты для отображения актуальной информации",
            "Добавьте планы для организации и отслеживайте ее эффективность по всем ключевым параметрам"
        ],
    },
    {
        title: "Продвинутый",
        classTitle: "title-green",
        recommended: true,
        content: 'Постройте произвольные отчеты сочетая разные источники данных ',
        price: "Цена по запросу",
        classButton: "button",
        buttonText: "Подключить",
        list: [
            "Используйте расширенные настройки для построения графиков и отчетов",
            "Предоставьте возможность коллегам или клиентам присоединиться к организации",
            "Настройте отправку отчетов в любое время суток и получайте их на почту или через телеграмм"
        ],
    }
];

const Packages = ({className}) => {
    return (
        <div className={cn(styles.packages, className)}>
            <div className={styles.list}>
                {packages.map((x, index) => (
                    <div className={styles.package} key={index}>
                        <div className={styles.top}>
                            <div className={cn(x.classTitle, styles.title)}>{x.title}</div>
                            {x.recommended && (
                                <div className={styles.recommended}>Рекомендуем</div>
                            )}
                        </div>
                        <div
                            className={styles.content}
                            dangerouslySetInnerHTML={{__html: x.content}}
                        ></div>
                        <div className={styles.line}>
                            <div className={cn("h3", styles.percent)}>{x.price}</div>
                        </div>
                        <ul className={styles.group}>
                            {x.list.map((item, index) => (
                                <li className={styles.item} key={index}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <button className={cn(x.classButton, styles.button)}>
                            {x.buttonText}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Packages;
