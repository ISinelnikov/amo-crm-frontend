import React, {useContext, useEffect, useState} from "react";
import cn from "classnames";
import styles from "./ProfileSettings.module.css";
import Item from "../../Item";
import Icon from "../../../../components/Icon";
import TextInput from "../../../../components/TextInput";
import ApiUtil from "../../../../service/ApiUtil";
import UserProfileContext from "../../../../context/UserProfile/Context";

const ProfileSettings = ({className}) => {
    const [profile, setProfile] = useContext(UserProfileContext);
    const [profileDetails, setProfileDetails] = useState({
        username: '',
        firstName: '',
        lastName: '',
        avatar: '',
        authType: ''
    });

    useEffect(() => {
        ApiUtil.getProfile()
            .then(body => setProfileDetails(body))
            .catch(error => console.log(error))
    }, []);

    const updateProfile = () => {
        ApiUtil.updateProfile(profileDetails.firstName, profileDetails.lastName)
            .then(body => setProfile({...profileDetails, id: profile.id}))
            .catch(error => console.log(error));
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            if (file) {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = () => {
                    resolve(fileReader.result);
                };
                fileReader.onerror = (error) => {
                    reject(error);
                };
            }
        });
    };
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);

        ApiUtil.updateAvatar(base64)
            .then(body => {
                setProfileDetails({...profileDetails, avatar: base64});
                setProfile({...profile, avatar: base64});
            })
            .catch(error => {
                console.log(error);
            })
    };

    const handleDeleteAvatar = () => {
        ApiUtil.deleteAvatar()
            .then(body => {
                setProfileDetails({...profileDetails, avatar: ''});
                setProfile({...profile, avatar: ''});
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <Item
            className={cn(styles.card, className)}
            title="Профиль"
            classTitle="title-purple"
        >
            <div className={styles.profile}>
                <div className={styles.avatar}>
                    {profileDetails.avatar
                        ? <img src={`${profileDetails.avatar}`} alt="Avatar"/>
                        : <img src="/images/content/avatar.png" alt="Avatar"/>
                    }
                    <button className={styles.remove}>
                        <Icon name="close"/>
                    </button>
                </div>
                <div className={styles.file}>
                    <input type="file"
                           name="avatar"
                           accept=".jpeg, .png, .jpg"
                           onChange={(e) => handleFileUpload(e)}
                    />
                    <button className={cn("button", styles.button)} type="button">
                        <Icon name="add" size="24"/>
                        <span>Загрузить</span>
                    </button>
                </div>
                <button onClick={handleDeleteAvatar} className={cn("button-stroke", styles.button)}>Удалить</button>
            </div>
            <form onSubmit={(event) => {
                event.preventDefault();
                updateProfile();
            }}>
                <div className={styles.fieldset}>
                    <TextInput
                        className={styles.field}
                        value={profileDetails.username}
                        label="Логин"
                        name="email"
                        type="email"
                        required
                        disabled
                    />
                </div>
                <div className={styles.group}>
                    <TextInput
                        className={styles.field}
                        value={profileDetails.firstName}
                        onChange={event => setProfileDetails({
                            ...profileDetails,
                            firstName: event.target.value
                        })}
                        label="Имя"
                        name="value"
                        type="text"
                        placeholder="Имя"
                        required
                    />
                    <TextInput
                        className={styles.field}
                        label="Фамилия"
                        value={profileDetails.lastName}
                        onChange={event => setProfileDetails({
                            ...profileDetails,
                            lastName: event.target.value
                        })}
                        name="value"
                        type="text"
                        placeholder="Фамилия"
                        required
                    />
                </div>
                <button className={cn("button-stroke", styles.button)}>
                    Обновить профиль
                </button>
            </form>
        </Item>
    );
};

export default ProfileSettings;
