import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../page/Main';
import Diary from '../page/Diary';
import Write from '../page/Write';
import Login from '../page/Login';
import Register from '../page/Register';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/'>
                    <Route index element={<Main />} />
                    <Route path=':diaryId' element={<Diary />} />
                </Route>
                <Route path='/write' element={<Write />} />
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;