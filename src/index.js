import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import DarkModeProvider from './context/DarkMode/Provider';
import UserProfileProvider from "./context/UserProfile/Provider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <UserProfileProvider>
            <DarkModeProvider>
                <App/>
            </DarkModeProvider>
        </UserProfileProvider>
    </React.StrictMode>
);