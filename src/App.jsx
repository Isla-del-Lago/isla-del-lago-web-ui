import './App.css';
import Register from './Pages/Register';
import Login from './Pages/Login';
import { Route, Routes, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import Home from './Pages/Home';
import Layout from './Components/Layout';
import NewBill from './Pages/NewBill';
import NewConsumptions from './Pages/NewConsumptions';
import ManageConsumptions from './Pages/ManageConsumptions';
import AuthContext from './Components/Store/auth-context';

function App() {
    const [userLoginState, setUserLoginState] = useState(false);

    const onLoginHandler = () => {
        setUserLoginState(true);
    };
    const onLogoutHandler = () => {
        sessionStorage.clear();
        setUserLoginState(false);
    };
    return (
        <AuthContext.Provider
            value={{
                userLoginState: userLoginState,
                onLogout: onLogoutHandler,
            }}
        >
            <div className='App'>
                <Layout>
                    <Routes>
                        <Route
                            path='/'
                            element={
                                userLoginState ? (
                                    <Navigate to='/home' />
                                ) : (
                                    <Login onLogin={onLoginHandler} />
                                )
                            }
                        />

                        <Route
                            path='/home'
                            element={
                                !userLoginState ? (
                                    <Navigate to='/login' />
                                ) : (
                                    <Home />
                                )
                            }
                        />

                        <Route
                            path='/create-bill'
                            element={
                                !userLoginState ? (
                                    <Navigate to='/' />
                                ) : (
                                    <NewBill />
                                )
                            }
                        />
                        <Route
                            path='/calculate-percentages'
                            element={<NewConsumptions />}
                        />
                        <Route
                            path='/manage-consumptions'
                            element={
                                !userLoginState ? (
                                    <Navigate to='/' />
                                ) : (
                                    <ManageConsumptions />
                                )
                            }
                        />
                    </Routes>
                </Layout>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
