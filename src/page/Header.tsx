import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { firebaseAuth, signOut } from '../fbase';
import * as S from '../styled';

const Header = () => {
    const [logout, setLogout] = useState<boolean>(false); // 로그아웃 성
    const navigate = useNavigate();

    const logOut = (): void=> {
        signOut(firebaseAuth).then(()=> {
            navigate("/");
            setLogout(true);
        }).catch((e: any)=> {
            console.log(e.message);
        });
    };

    useEffect(()=> {
        setLogout(!firebaseAuth.currentUser);
    }, [firebaseAuth.currentUser]);

    return (
        <S.MenuWrapper>
            <S.Menus logInfo={true}>
                <Link to="/">메뉴 부분</Link>
            </S.Menus>
            <S.Menus logInfo={true}>
                <Link to="/write">글</Link>
            </S.Menus>
            <S.Menus logInfo={logout}>
                <Link to="/login">로그인</Link>
            </S.Menus>
            <S.Menus logInfo={logout}>
                <Link to="/register">회원가입</Link>
            </S.Menus>
            <S.Menus logInfo={!logout} onClick={logOut}>
                로그아웃
            </S.Menus>
        </S.MenuWrapper>
    );
};

export default Header;