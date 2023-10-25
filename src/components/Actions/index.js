import cn from 'classnames';
import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import Icon from '../Icon';
import styles from './Actions.module.css';

const Actions = ({
  className,
  classActionsHead,
  classActionsBody,
  classActionsOption,
  items,
  visible,
  setVisible,
  small,
  up,
}) => {
  const [innerVisible, setInnerVisible] = useState(false);

  const toggle = () => {
    setVisible ? setVisible(!visible) : setInnerVisible(!innerVisible);
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() =>
        setVisible ? setVisible(false) : setInnerVisible(false)
      }
    >
      <div
        className={cn(
          styles.actions,
          className,
          {
            [styles.small]: small,
          },
          {
            [styles.up]: up,
          },
          {
            [styles.active]: visible ? visible : innerVisible,
          }
        )}
      >
        <button
          className={cn(styles.head, classActionsHead)}
          onClick={() => toggle()}
        >
          <Icon name='more-horizontal' size='24' />
        </button>
        <div className={cn(styles.body, classActionsBody)}>
          {items.map((x, index) => (
            <button
              className={cn(styles.option, classActionsOption)}
              onClick={x.action}
              key={index}
            >
              {x.icon && <Icon name={x.icon} size='24' />}
              {x.title}
            </button>
          ))}
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Actions;
