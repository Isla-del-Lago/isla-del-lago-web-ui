import './App.css';
import Register from './Pages/Register';
import Login from './Pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Home from './Pages/Home';
import NewConsumption from './Pages/NewConsumption';
import Layout from './Components/Layout';

function App() {
    const [userLoginState, setUserLoginState] = useState(false);
    useEffect(() => {
        setUserLoginState(sessionStorage.UserLoginState);
    });
    const logout = () => {
        setUserLoginState(false);
    };
    return (
        <div className='App'>
            <BrowserRouter>
                <Layout
                    userLoginState={userLoginState}
                    onLogoutHandler={logout}
                >
                    <Routes>
                        <Route
                            path='/'
                            element={<Home userLoginState={userLoginState} />}
                        />
                        <Route path='/register' element={<Register />} />
                        <Route path='/login' element={<Login />} />
                        <Route
                            path='/create-bill'
                            element={
                                <NewConsumption
                                    userLoginState={userLoginState}
                                />
                            }
                        />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </div>
    );
}

export default App;
