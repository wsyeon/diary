import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
            setLogout(!user);
        });
        return unsubscribe;
    }, []);

    const goWrite = ()=> {
        if (firebaseAuth.currentUser === null) {
            alert("로그인 해주세요");
        }
        if (firebaseAuth.currentUser !== null) {
            navigate("/write");
        }
    };

    return (
        <S.MenuWrapper>
            <S.Menus logInfo={true}>
                <Link to="/">메뉴 부분</Link>
            </S.Menus>
            <S.Menus logInfo={true}>
                <div onClick={goWrite}>글</div>
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