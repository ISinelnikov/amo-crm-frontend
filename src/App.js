import React, {useContext, useEffect} from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Page from './components/Page';
import MeetingAndDeals from './screens/Manager';
import SignIn from './screens/SignIn';
import './styles/app.css';
import Dashboard from "./screens/Dashboard";
import Leads from "./screens/Leads";
import LocalStorageService from "./service/LocalStorageService";
import ApiUtil from "./service/ApiUtil";
import Pipeline from "./screens/Pipeline";
import PersonalSettings from "./screens/Settings/PersonalSettings";
import Subscription from "./screens/Subscription";
import UserProfileContext from "./context/UserProfile/Context";
import SignUp from "./screens/SignUp";
import SpaceSettings from "./screens/Settings/SpaceSettings";

const Menu = () => {
    const [profile, setProfile] = useContext(UserProfileContext);

    const onSuccessLogin = (token) => {
        LocalStorageService.setSecurityToken(token);

        ApiUtil.getProfile()
            .then(body => {
                setProfile(body);
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        let token = LocalStorageService.getSecurityToken();
        console.log('Current token', token);

        if (token) {
            onSuccessLogin(token);
        }
    }, []);

    return (
        <Routes>
            <Route path='*' element={
                <Page title="Запрошенная страница не найдена"/>
            }
            />
            <Route path="/dashboard" element={
                <Page title="Квалификации и источники">
                    <Dashboard/>
                </Page>
            }
            />
            <Route path="/pipeline" element={
                <Page title="Воронка продаж">
                    <Pipeline/>
                </Page>
            }
            />
            <Route path="/leads" element={
                <Page title="Сделки">
                    <Leads/>
                </Page>
            }
            />
            <Route path="/deals" exact element={
                <Page title="Встречи и продажи">
                    <MeetingAndDeals/>
                </Page>
            }
            />
            <Route path="/profile-settings" exact element={
                <Page title="Настройки профиля">
                    <PersonalSettings/>
                </Page>
            }
            />
            <Route path="/organization-settings" exact element={
                <Page title="Настройки организации">
                    <SpaceSettings/>
                </Page>
            }
            />
            <Route path="/subscription" element={
                <Page title="Тарифы и оплата">
                    <Subscription/>
                </Page>
            }
            />
            <Route path={'/'} element={
                (profile ? <Navigate to={'/dashboard'}/> :
                    <SignIn onSuccessLogin={onSuccessLogin}/>)
            }/>
            <Route path={'/sign-up'} element={
                (profile ? <Navigate to={'/dashboard'}/> :
                    <SignUp/>)
            }/>
        </Routes>
    );
}

const App = () => {
    return (
        <Router>
            <Menu/>
        </Router>
    )
}

export default App;
