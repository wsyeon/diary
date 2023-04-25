import React, { ChangeEvent, FormEvent, useState } from 'react';
import { firebaseAuth, createUserWithEmailAndPassword, updateProfile } from '../fbase';
import * as S from '../styled';
import { useNavigate } from 'react-router';


const Register = () => {
    const [registerId, setRegisterId] = useState<string>("");
    const [registerPw, setRegisterPw] = useState<string>("");
    const [registerPwCheck, setRegisterPwCheck] = useState<string>("");
    const [nickName, setNickName] = useState<string>("");
    const [errMsg, setErrMsg] = useState<string>("");
    const navigate = useNavigate();

    const createUser = async ()=> {
        setErrMsg("");
        if (registerPw === registerPwCheck) {
            try {
                const createUser = await createUserWithEmailAndPassword(firebaseAuth, registerId, registerPw);

                await updateProfile(createUser.user, {displayName: nickName});
    
                setRegisterId("");
                setRegisterPw("");
                setRegisterPwCheck("");
                
                navigate("/login");
            } catch (e: any) {
                switch (e.code) {
                    case 'auth/weak-password':
                        setErrMsg('비밀번호는 6자리 이상이어야 합니다');
                        break;
                    case 'auth/invalid-email':
                        setErrMsg('잘못된 이메일 주소입니다');
                        break;
                    case 'auth/missing-password':
                        setErrMsg("비밀번호를 입력해주세요");
                        break;
                    case 'auth/missing-email':
                        setErrMsg("이메일을 입력해주세요");
                        break;
                    case 'auth/email-already-in-use':
                        setErrMsg('이미 가입되어 있는 계정입니다');
                        break;
                }
            }
        } else {
            alert("비밀번호가 다릅니다.");
            setRegisterPw("");
            setRegisterPwCheck("");
        }
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>)=> {
        const {target: { name, value } } = e;

        if (name === "id") setRegisterId(value);
        if (name === "pw") setRegisterPw(value);
        if (name === "pwCheck") setRegisterPwCheck(value);
        if (name === "nickName") setNickName(value);
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
    }

    return (
        <S.RegisterWrapper>
            <S.RegisterForm onSubmit={onSubmit}>
                <S.RegisterFormWrapper>
                    <h3>회원가입</h3>
                    <S.RegisterInputWrapper>
                        <label htmlFor="nickName">이름</label>
                        <S.RegisterInput type='text' id='nickName' name='nickName' onChange={onChange} value={nickName} />
                    </S.RegisterInputWrapper>
                    <S.RegisterInputWrapper>
                        <label htmlFor="id">아아디</label>
                        <S.RegisterInput type='text' id='id' name='id' onChange={onChange} value={registerId} />
                    </S.RegisterInputWrapper>
                    <S.RegisterInputWrapper>
                        <label htmlFor="pw">비밀번호</label>
                        <S.RegisterInput type='password'id='pw' name='pw' onChange={onChange} value={registerPw} />
                    </S.RegisterInputWrapper>
                    <S.RegisterInputWrapper>
                        <label htmlFor="pwChek">비밀번호 확인</label>
                        <S.RegisterInput type='password'id='pwCheck' name='pwCheck' onChange={onChange} value={registerPwCheck} />
                    </S.RegisterInputWrapper>
                    <S.ErrorMessage>{errMsg}</S.ErrorMessage>
                    <S.RegisterBtnWrapper>
                        <S.RegisterBtn onClick={createUser}>회원가입</S.RegisterBtn>
                    </S.RegisterBtnWrapper>
                </S.RegisterFormWrapper>
            </S.RegisterForm>
        </S.RegisterWrapper>
    );
};

export default Register;