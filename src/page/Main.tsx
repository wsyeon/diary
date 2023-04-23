import React, { useEffect, useState } from 'react';
import { firebaseAuth } from '../fbase';

const Main = () => {
    const [test, setTest] = useState<string>("");

    useEffect(()=> {
        firebaseAuth.onAuthStateChanged(user=> {
            if (user) {
                setTest("logOut");
            } else {
                setTest("login");
            }

        })
    }, []);
    return (
        <div>
            {test}
        </div>
    );
};

export default Main;