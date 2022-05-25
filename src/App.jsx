import './App.css';
import Register from './Pages/Register';
import Login from './Pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Home from './Pages/Home';
import Layout from './Components/Layout';
import NewBill from './Pages/NewBill';
import NewConsumptions from './Pages/NewConsumptions';


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
                                <NewBill
                                    userLoginState={userLoginState}
                                />
                            }
                        />
                        <Route
                            path='/calculate-percentages'
                            element={
                                <NewConsumptions
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
