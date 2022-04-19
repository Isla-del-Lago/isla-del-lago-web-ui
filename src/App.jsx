import './App.css';
import Register from './Pages/Register';
import Login from './Pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import Home from './Pages/Home';
import NewConsumption from './Pages/Testing/NewConsumption';

function App() {
    const [userLoginStatus, setUserLoginStatus] = useState(false);
    const changeUserStatus = () => {
        console.log('yes');
        setUserLoginStatus(sessionStorage.UserLoginStatus);
        console.log(userLoginStatus);
    };
    return (
        <div className='App'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home userLoginState={userLoginStatus} />} />
                    <Route path='/register' element={<Register />} />
                    <Route
                        path='/login'
                        element={<Login onUserLogedin={changeUserStatus} />}
                    />
                    {userLoginStatus ? (
                        <Route
                            path='/newConsumption'
                            element={<NewConsumption />}
                        />
                    ) : (
                        <Route
                            path='/newConsumption'
                            element={<Login onUserLogedin={changeUserStatus} />}
                        />
                    )}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
