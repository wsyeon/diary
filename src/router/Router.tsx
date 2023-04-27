import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../page/Main';
import DetailDiary from '../page/DetailDiary';
import Write from '../page/Write';
import Login from '../page/Login';
import Register from '../page/Register';
import NotFound from '../page/NotFound';
import Header from '../page/Header';
import Update from '../page/Update';

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/'>
                    <Route index element={<Main />} />
                    <Route path='/user/:diaryId' element={<DetailDiary />} />
                    <Route path='/update/:diaryId' element={<Update />} />
                </Route>
                <Route path='/write' element={<Write />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;