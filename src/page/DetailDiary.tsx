import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { dbService, getDocs, query, where, collection } from '../fbase';
import { Diary } from './Write';

interface DiaryProps {
    diaryInfo: Diary
}

const DetailDiary = () => {
    const location = useLocation();
    const { id } = location.state;
    const [diary, setDiary] = useState<DiaryProps[]>([]);

    useEffect(()=> {
        const diaryInfo = async (): Promise<void> => {
            try {
                const diaryDetail = await getDocs(query(collection(dbService, "diary"), where("id", "==", id)));
                const diaryInfo = diaryDetail.docs.map((doc)=> {
                    const data: DiaryProps = {
                        diaryInfo: {
                            id: id,
                            title: doc.data().title,
                            date: doc.data().date,
                            text: doc.data().text,
                            name: doc.data().name,
                            email: doc.data().email,
                            tags: doc.data().tags,
                            nowDate: doc.data().nowDate
                        },
                    };
                    return data;
                });
                setDiary(diaryInfo);
            } catch (e: any) {
                console.log(e);
            }
        }
        diaryInfo();
    }, [id]);

    return (
        <div>
            <div>
                {diary.map((data, idx)=> (
                    <div key={idx}>
                        <div>
                            날짜: {data.diaryInfo.date}
                        </div>
                        <div>
                            제목: {data.diaryInfo.title}
                        </div>
                        <div>
                            내용: {data.diaryInfo.text}
                        </div>
                        <div>
                            태그: <span>{data.diaryInfo.tags}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DetailDiary;