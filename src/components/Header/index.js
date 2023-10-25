import React, {useState} from 'react';
import styles from './Header.module.css';
import User from './User';

const Header = ({ onOpen }) => {
    const [ visible, setVisible ] = useState(false);
    const handleClick = () => {
        onOpen();
        setVisible(false);
    };

    return (
        <header className={ styles.header }>
            <button className={ styles.burger } onClick={ () => handleClick() }></button>

            <div>
                <h1>Order Stat Studio</h1>
            </div>

            <div className={ styles.control } onClick={ () => setVisible(false) }>
                <User className={ styles.user }/>
            </div>
        </header>
    );
};

export default Header;
