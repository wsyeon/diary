import React, { ChangeEvent, useState } from 'react';
import { firebaseAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../fbase';

const Register = () => {
    const [registerId, setRegisterId] = useState<string>("");
    const [registerPw, setRegisterPw] = useState<string>("");
    const [errMsg, setErrMsg] = useState<string>("");

    const test = async ()=> {
        try {
            const createUser = await createUserWithEmailAndPassword(firebaseAuth, registerId, registerPw);

            setRegisterId("");
            setRegisterPw("");

            console.log(createUser);
        } catch (e: any) {
            setErrMsg(e.message);
        }
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>)=> {
        const {target: { name, value } } = e;

        if (name === "id") setRegisterId(value);
        if (name === "pw") setRegisterPw(value);
    }

    return (
        <div>
            <div>
                {errMsg}
                <div>
                    <input type='text' name='id' onChange={onChange} value={registerId} />
                </div>
                <div>
                    <input type='password' name='pw' onChange={onChange} value={registerPw} />
                </div>
                <div>
                    <button onClick={test}>확인</button>
                </div>
            </div>
        </div>
    );
};

export default Register;