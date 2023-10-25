import React, {useState} from "react";
import cn from "classnames";
import styles from "./PasswordSettings.module.css";
import Item from "../../Item";
import TextInput from "../../../../components/TextInput";
import ApiUtil from "../../../../service/ApiUtil";

const PasswordSettings = ({ className }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const updatePassword = () => {
    if (newPassword !== confirmNewPassword) {
      console.log('invalid');
      return;
    }
    ApiUtil.updatePassword(currentPassword, newPassword)
        .then(body => console.log(body))
        .catch(error => console.log(error));
  }

  return (
    <Item
      className={cn(styles.card, className)}
      title="Пароль"
      classTitle="title-purple"
    >
      <form onSubmit={(event) => {
        event.preventDefault();
        updatePassword();
      }}>
      <div className={styles.fieldset}>
        <TextInput
          className={styles.field}
          value={currentPassword}
          onChange={event => setCurrentPassword(event.target.value)}
          label="Текущий пароль"
          name="old-password"
          type="password"
          required
        />
        <div className={styles.row}>
          <TextInput
            className={styles.field}
            value={newPassword}
            onChange={event => setNewPassword(event.target.value)}
            label="Новый пароль"
            name="new-password"
            type="password"
            required
          />
          <TextInput
            className={styles.field}
            value={confirmNewPassword}
            onChange={event => setConfirmNewPassword(event.target.value)}
            label="Подтвердите новый пароль"
            name="confirm-password"
            type="password"
            required
          />
        </div>
        <button className={cn("button-stroke", styles.button)}>
          Обновить пароль
        </button>
      </div>
      </form>
    </Item>
  );
};

export default PasswordSettings;
