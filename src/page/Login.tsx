import React, { FormEvent, ChangeEvent, useState, useEffect } from 'react';
import * as S from '../styled';
import { useNavigate } from 'react-router';
import { signInWithEmailAndPassword, firebaseAuth } from '../fbase';
import { Link } from 'react-router-dom';

const Login = () => {
    const [loginId, setLoginId] = useState<string>("");
    const [loginPw, setLoginPw] = useState<string>("");
    const [errMsg, setErrMsg] = useState<string>("");
    const navigate = useNavigate();

    useEffect(()=> {
        firebaseAuth.onAuthStateChanged(user=> {
            if (user) navigate("/");
        });
    }, [navigate]);

    const loginUser = async ()=> {
        setErrMsg("");
        try {
            await signInWithEmailAndPassword(firebaseAuth ,loginId, loginPw);

            navigate("/");
        } catch (e: any) {
            console.log(e.code);
            switch (e.code) {
                case "auth/invalid-email":
                    setErrMsg("이메일을 입력해주세요");
                    break;
                case "auth/missing-password":
                    setErrMsg("비밀번호를 입력해주세요");
                    break;
                case "auth/user-not-found":
                    setErrMsg("존재하지 않는 계정입니다.");
                    break;
                case "auth/wrong-password":
                    setErrMsg("비빌번호가 틀립니다");
                    break;
            }
        }
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>)=> {
        const {target: { name, value } } = e;

        if (name === "id") setLoginId(value);
        if (name === "pw") setLoginPw(value);
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
    };
    return (
        <S.LoginWrapper>
            <S.LoginForm onSubmit={onSubmit}>
                <S.LoginFormWrapper>
                    <h3>로그인</h3>
                    <S.LoginInputWrapper>
                        <label htmlFor="id">아아디</label>
                        <S.LoginInput type='text' id='id' name='id' onChange={onChange} value={loginId} />
                    </S.LoginInputWrapper>
                    <S.LoginInputWrapper>
                        <label htmlFor="pw">비밀번호</label>
                        <S.LoginInput type='password'id='pw' name='pw' onChange={onChange} value={loginPw} />
                    </S.LoginInputWrapper>
                    <S.ErrorMessage>{errMsg}</S.ErrorMessage>
                    <S.LoginBtnWrapper>
                        <S.LoginBtn onClick={loginUser}>로그인</S.LoginBtn>
                    </S.LoginBtnWrapper>
                    <div>아직 계정이 없다면? <Link to="/register">회원가입 하기</Link></div>
                </S.LoginFormWrapper>
            </S.LoginForm>
        </S.LoginWrapper>
    );
};

export default Login;