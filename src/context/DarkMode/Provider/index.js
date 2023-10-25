import React, { useState } from 'react';
import DarkModeContext from '../Context';

const DarkModeProvider = (props) => {
    const [ darkMode, setDarkMode ] = useState(false);

    const toggleDarkMode = () => {
        if (!darkMode) {
            document.body.classList.remove('lite-mode');
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('lite-mode');
        }
        setDarkMode(!darkMode);
    };

    return (
        <DarkModeContext.Provider value={ [ darkMode, toggleDarkMode ] }>
            { props.children }
        </DarkModeContext.Provider>
    );
};

export default DarkModeProvider;