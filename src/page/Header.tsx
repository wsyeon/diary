import React from 'react';
import { Link } from 'react-router-dom';
import { firebaseAuth, signOut } from '../fbase';

const Header = () => {

    const logOut = ()=> {
        signOut(firebaseAuth).then(()=> {
            console.log("로그아웃 성공");
        }).catch((e: any)=> {
            console.log(e.message);
        });
    };

    return (
        <div style={{ height: "8vh", width: "100%", border: "1px solid red" }}>
            <Link to="/">메뉴 부분</Link>
            <div style={{ display: "inline-block", marginLeft: "15px" }}>
                <Link to="/write">글</Link>
            </div>
            <div style={{ display: "inline-block", marginLeft: "15px" }}>
                <Link to="/login">로그인</Link>
            </div>
            <div style={{ display: "inline-block", marginLeft: "15px" }}>
                <Link to="/register">회원가입</Link>
            </div>
            <div onClick={logOut} style={{ display: "inline-block", marginLeft: "15px", cursor: "pointer" }}>
                로그아웃
            </div>
        </div>
    );
};

export default Header;