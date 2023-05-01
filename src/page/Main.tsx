import React, { useEffect, useState } from 'react';
import { collection, dbService, doc, deleteDoc, onSnapshot, query, firebaseAuth } from '../fbase';
import { Diary } from './Write';
import { useNavigate } from 'react-router';
import * as S from '../styled';

interface DiaryProps {
    diaryInfo: Diary;
}

const Main = () => {
    const [diaryList, setDiaryList] = useState<DiaryProps[]>([]);
    const navigate = useNavigate();

    useEffect((): void=> {
        const diaryInfoList = async (): Promise<()=> void>=> {
            try {
                const getDiaries = await query(collection(dbService, "diary"));
                const unsubscribe = onSnapshot(getDiaries, (snapshot)=> {
                    const diariesData = snapshot.docs.map((doc)=> {
                        const diaryData: DiaryProps = {
                            diaryInfo: {
                                id: doc.id,
                                title: doc.data().title,
                                date: doc.data().date,
                                text: doc.data().text,
                                name: doc.data().name,
                                email: doc.data().email,
                                tags: doc.data().tags,
                                nowDate: doc.data().nowDate,
                                public: true,
                            },
                        };
                        return diaryData;
                    });
                    setDiaryList(diariesData);
                });
                return ()=> unsubscribe();
            } catch (e: any) {
                console.log(e.message);
                return Promise.reject(e); // 클린업 사용할거면 catch 부분에도 return 해야함
            }
        };
        diaryInfoList();
    }, []);

    const Test = (id: string): void=> {
        navigate(`/user/${id}`, { state: { id: id } });
    };

    const goUpdate = (data: DiaryProps): void=> {
        navigate(`/update/${data.diaryInfo.id}`,
        { 
            state: { 
                id: data.diaryInfo.id,
                updateTitle: data.diaryInfo.title,
                updateTags: data.diaryInfo.tags,
                updateText: data.diaryInfo.text,
                updateDate: data.diaryInfo.date
            },
        });
    };

    return (
        <S.MainWrapper>
            {diaryList.sort((a, b)=> b.diaryInfo.nowDate - a.diaryInfo.nowDate).map((data, idx)=> (
                <div key={idx} style={ data.diaryInfo.public ? { border: '1px solid blue', width: "700px", marginTop: '10px', display: "flex", justifyContent: "space-between" } : { display: "none" }}>
                    <div style={{ width: "85%" }} onClick={()=> Test(data.diaryInfo.id)}>
                        <div>
                            날짜: {data.diaryInfo.date}
                        </div>
                        <div>
                            제목: {data.diaryInfo.title}
                        </div>
                        <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            내용: {data.diaryInfo.text}
                        </div>
                        <div>
                            태그: <span>{data.diaryInfo.tags}</span>
                        </div>
                    </div>
                    {firebaseAuth.currentUser === null ? (<></>) : (
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                            <div>
                                <button onClick={()=> goUpdate(data)}>수정하기</button>
                            </div>
                            <div>
                                <button onClick={async ()=> await deleteDoc(doc(dbService, "diary", data.diaryInfo.id)) }>삭제하기</button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </S.MainWrapper>
    );
};

export default Main;