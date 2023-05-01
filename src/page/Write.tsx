import React, { ChangeEvent, useState } from 'react';
import * as S from '../styled';
import { dbService, firebaseAuth, setDoc, doc } from '../fbase';
import uuid from 'react-uuid';
import { useNavigate } from 'react-router';

export interface Diary {
    id: string;
    date: string,
    text: string,
    name?: string | null | undefined,
    title: string,
    email: string | null | undefined,
    tags?: string[],
    nowDate: number
}

const Write = () => {
    const [inputTags, setInputTags] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    const [title, setTitle] = useState<string>("");
    const [text, setText] = useState<string>("");
    const date = new Date();
    const navigate = useNavigate();

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void=> {
        const { target: { name, value } } = e;

        if (name === "title") setTitle(value);
        if (name === "text") setText(value);
        if (name === "tags") setInputTags(value);
    };

    const addTags = (): void=> {
        const newTag = `#${inputTags}`;
        if (!inputTags) return;
        if (tags.includes(newTag)) {
            setInputTags("");
            return;
        };
        const nextTags = [...tags, `#${inputTags}`];
        setTags(nextTags);
        setInputTags("");
    };

    const onWrite = async (): Promise<boolean>=> {
        if (title.trim() === "" || text.trim() === "" ) {
            alert("글, 제목을 입력해주세요");

            return false;
        }
        try {
            const newDiary: Diary = {
                id: uuid(),
                name: firebaseAuth.currentUser?.displayName,
                text: text,
                title: title,
                email: firebaseAuth.currentUser?.email,
                date: date.toLocaleDateString(),
                tags: tags,
                nowDate: date.getTime(),
            };

            await setDoc(doc(dbService, "diary", `${newDiary.id}`), newDiary);
            setTags([]);
            setText("");
            setTitle("");
            navigate("/");

            return true;
        } catch (e: any) {
            console.log(e.code);

            return false;
        }
    };

    const deleteTag = (data: string): void=> {
        const delTag = tags.filter(tag=> tag !== data);
        setTags(delTag);
    };

    return (
        <S.WriteWrapper>
            <S.DiaryWrapper>
                <S.DiaryTitleWrapper>
                    <S.DiaryTitleInput placeholder='제목을 입력해주세요' name='title' type='text' onChange={onChange} value={title} /> 
                </S.DiaryTitleWrapper>
                <S.DiaryTextWrapper>
                    <S.DiaryText rows={20} cols={40} placeholder='오늘의 기록 쓰기' name='text' onChange={onChange} value={text} />
                </S.DiaryTextWrapper>
                <S.DiaryTagsWrapper>
                    <S.DiaryTags placeholder='태그' type='text' value={inputTags} name='tags' onChange={onChange}/>
                    <S.DiaryTagsBtn onClick={addTags}>태그</S.DiaryTagsBtn>
                    <div>
                        {tags.map((data, idx)=> (
                            <div style={{ display: "inline", marginRight: "5px", cursor: "pointer" }} onClick={()=> deleteTag(data)} key={idx}>
                                {data}
                            </div>
                        ))}
                    </div>
                </S.DiaryTagsWrapper>
                <S.WriteBtnWrapper>
                    <S.WriteBtn onClick={onWrite}>글 쓰기</S.WriteBtn>
                </S.WriteBtnWrapper>
            </S.DiaryWrapper>
        </S.WriteWrapper>
    );
};

export default Write;