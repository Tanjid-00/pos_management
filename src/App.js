/* eslint-disable */

import { React, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import style from './app.module.css';
import Home from './layouts/homeLayout/Home';
import Pos from './pages/posPage/Pos';
import Dashboard from './pages/dashboardPage/Dashboard';
import Products from './pages/productPage/Products';
import Header from './layouts/header/Header';
import SingleProduct from './pages/productPage/SingleProduct';
import Login from './pages/signup/Login';
import Protected from './layouts/homeLayout/Protected';
import Error from './layouts/errorPage/Error';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (username, password) => {
        if (username.trim() !== '' && password.trim() !== '') {
            setIsLoggedIn(true);
        }
    };
    return (
        <div className={style.container}>
            <BrowserRouter>
                <Routes>
                    <Route path="/pos_management" element={isLoggedIn ? <Navigate to="/pos_management" /> : <Login onLogin={handleLogin} />} />
                </Routes>
                {isLoggedIn && (
                    <Home>
                        <Header />
                        <div className={style.pageContent}>
                            <Routes>
                                <Route path="/pos_management" element={<Dashboard />} />
                                <Route path="/products" element={<Products />} />
                                <Route path="/singleProduct/:id" element={<SingleProduct />} />
                                <Route path="/pos" element={<Pos />} />
                                <Route path="/*" element={<Error />} />
                            </Routes>
                        </div>
                    </Home>
                )}
            </BrowserRouter>
        </div>
    );
};

export default App;
