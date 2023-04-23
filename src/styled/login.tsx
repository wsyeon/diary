import styled from '@emotion/styled';

export const LoginWrapper = styled.div`
    // 전체 감싸는 영역
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const LoginForm = styled.form`
    // form 영역
    width: 40%;
    height: 60%;
    border: 1px solid red;
`;

export const LoginFormWrapper = styled.div`
    width: 80%;
    display: flex;
    margin: 0 auto;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;

export const LoginInputWrapper = styled.div`
    // input 부모 영역
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 4rem;
    justify-content: flex-start;
`;

export const LoginInput = styled.input`
    // input 영역
    height: 60%;
    font-size: 1.125rem;
    padding-left: 0.5rem;
    margin-top: 5px;
`;

export const LoginBtnWrapper = styled.div`
    // btn 부모 영역
    width: 100%;
    height: 2rem;
`;

export const LoginBtn = styled.button`
    // btn 영역
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0.75rem;
    font-size: 1.125rem;
    color: #333;
    :hover {
        color: #000;
        background-color: #e4e4e4;
    }
`;
