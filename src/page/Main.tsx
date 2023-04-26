import React, { useEffect, useState } from 'react';
import { firebaseAuth, collection, getDocs, dbService } from '../fbase';
import { Diary } from './Write';

interface DiaryProps {
    diaryInfo: Diary;
}

const Main = () => {
    const [test, setTest] = useState<string>("");
    const [nickName, setNickName] = useState<string | null | undefined>("");
    const [diaryList, setDiaryList] = useState<DiaryProps[]>([]);

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

    useEffect(()=> {
        const diaryInfoList = async (): Promise<void>=> {
            const querySnapshot = await getDocs(collection(dbService, "diary"));
            const data = querySnapshot.docs.map((doc)=> {
                const diaryData: DiaryProps = {
                    diaryInfo: {
                        id: doc.id,
                        title: doc.data().title,
                        date: doc.data().date,
                        text: doc.data().text,
                        name: doc.data().name,
                        email: doc.data().email,
                        tags: doc.data().tags,
                    },
                };

                return diaryData;
            });

            setDiaryList(data);
        }

        diaryInfoList();
    }, []);

    return (
        <div>
            {firebaseAuth.currentUser === null ? (<>로그인하세요</>) : (
                <>
                    환영합니다. {nickName}님
                    <p>{test}</p>
                </>
            )}
            <div>
                {diaryList.map((data, idx)=> (
                    <div key={idx}>
                        <div>
                            제목: {data.diaryInfo.title}
                        </div>
                        <div>
                            내용: {data.diaryInfo.text}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Main;