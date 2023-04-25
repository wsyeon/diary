import React, { useEffect, useState } from 'react';
import { firebaseAuth, collection, getDocs, dbService } from '../fbase';

const Main = () => {
    const [test, setTest] = useState<string>("");
    const [nickName, setNickName] = useState<string | null | undefined>("");

    useEffect(()=> {
        firebaseAuth.onAuthStateChanged(user=> {
            if (user) {
                setNickName(firebaseAuth.currentUser?.displayName);
                setTest("logOut");
            } else {
                setTest("login");
            }

        })
    }, []);

    const onTest = async (): Promise<void>=> {
        try {
            const querySnapshot = await getDocs(collection(dbService, "diary"));
            querySnapshot.forEach((doc) => {
              console.log(Object.values(doc.data()));
            });
        } catch (e: any) {
            console.log(e.code);
        }
    };

    return (
        <div>
            {firebaseAuth.currentUser === null ? (<>로그인하세요</>) : (
                <>
                    환영합니다. {nickName}님
                    <p>{test}</p>
                </>
            )}
            <div>
                <button onClick={onTest}>test</button>
            </div>
        </div>
    );
};

export default Main;