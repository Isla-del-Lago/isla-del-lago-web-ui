import './App.css';
import Register from './Pages/Register';
import Login from './Pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Home from './Pages/Home';
import Layout from './Components/Layout';
import NewBill from './Pages/NewBill';
import NewConsumptions from './Pages/NewConsumptions';
import ManageConsumptions from './Pages/ManageConsumptions';

var urlUserBase = '';
var urlBillBase = '';
function App() {
    if (document.location.origin === 'http://localhost:3000') {
        urlUserBase = 'http://localhost:9000';
        urlBillBase = 'http://localhost:9003';
    } else {
        urlUserBase = 'https://isla-del-lago-user-mngr-qa.herokuapp.com';
        urlBillBase = 'https://isla-del-lago-bill-mngr-qa.herokuapp.com';
    }
    const [userLoginState, setUserLoginState] = useState(false);
    useEffect(() => {
        setUserLoginState(sessionStorage.UserLoginState);
    });
    const logout = () => {
        setUserLoginState(false);
        document.location = '/';
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
                        <Route
                            path='/register'
                            element={
                                <Register
                                    urlUserBase={urlUserBase}
                                    urlBillBase={urlBillBase}
                                />
                            }
                        />
                        <Route
                            path='/login'
                            element={
                                <Login
                                    urlUserBase={urlUserBase}
                                    urlBillBase={urlBillBase}
                                />
                            }
                        />
                        <Route
                            path='/create-bill'
                            element={
                                <NewBill
                                    userLoginState={userLoginState}
                                    urlUserBase={urlUserBase}
                                    urlBillBase={urlBillBase}
                                />
                            }
                        />
                        <Route
                            path='/calculate-percentages'
                            element={
                                <NewConsumptions
                                    userLoginState={userLoginState}
                                    urlUserBase={urlUserBase}
                                    urlBillBase={urlBillBase}
                                />
                            }
                        />
                        <Route
                            path='/manage-consumptions'
                            element={
                                <ManageConsumptions
                                    userLoginState={userLoginState}
                                    urlUserBase={urlUserBase}
                                    urlBillBase={urlBillBase}
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
