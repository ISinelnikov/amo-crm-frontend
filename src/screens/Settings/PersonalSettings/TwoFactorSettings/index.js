import React, {useContext, useEffect, useState} from "react";
import cn from "classnames";
import styles from "./TwoFactorSettings.module.css";
import Item from "../../Item";
import Switch from "../../../../components/Switch";
import ApiUtil from "../../../../service/ApiUtil";
import UserProfileContext from "../../../../context/UserProfile/Context";
import GAEnableModal from "./GAModal/GAEnableModal";
import GADisableModal from "./GAModal/GADisableModal";

const TwoFactorSettings = ({className}) => {
    const [profile, setProfile] = useContext(UserProfileContext);

    const [visibleGAEnableModal, setVisibleGAEnableModal] = useState(false);
    const [visibleGADisableModal, setVisibleGADisableModal] = useState(false);

    const [qrCode, setQrCode] = useState(null);

    useEffect(() => {
        if (visibleGAEnableModal) {
            ApiUtil.getGoogleAuthenticatorQRCode()
                .then(body => {
                    setQrCode(`data:${body.contentType};base64,${body.qrCode}`)
                })
        }
    }, [visibleGAEnableModal]);

    const enabled = () => {

    }

    const disabled = () => {

    }

    return (
        <Item
            className={cn(styles.card, className)}
            title="Двухфакторная аутентификация"
            classTitle="title-purple"
        >
            <div className={styles.list}>
                <div className={styles.line}>
                    <div className={styles.title}>
                        Аутентификация через Google Authenticator
                    </div>
                    <Switch
                        className={styles.switch}
                        value={profile ? profile.authType === 'GA' : false}
                        onChange={() => {
                            if (profile.authType === 'GA') {
                                setVisibleGADisableModal(true);
                            } else {
                                setVisibleGAEnableModal(true);
                            }
                        }}
                    />
                </div>
                {visibleGAEnableModal &&
                    <GAEnableModal visible={visibleGAEnableModal}
                                   setVisible={setVisibleGAEnableModal}
                                   setEnabled={enabled}
                                   qrCode={qrCode}
                    />
                }
                {visibleGADisableModal &&
                    <GADisableModal visible={visibleGADisableModal}
                                    setVisible={setVisibleGADisableModal}
                                    setDisabled={disabled}
                    />
                }
            </div>
        </Item>
    );
};

export default TwoFactorSettings;
