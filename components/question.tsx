'use client';

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { GridLoader } from "react-spinners";
import {HashLoader} from "react-spinners";

type t_question = {
    _id: string,
    question: string,
    choices: Array<string>
}
type t_questions = Array<t_question>;

export default function Question(props: any) {
    const questions: t_questions = props.questions.questions;
    const mainQuestion = props.questions.main;
    const [answers, setAnswers] = useState([-1, -1, -1]);
    const router = useRouter();
    const codeRef = useRef<HTMLInputElement | null>(null);
    const nameRef = useRef<HTMLInputElement | null>(null);

    const selectAns = (qIndx: number, ansIndx: number) => {
        setAnswers(prev => prev.map((e, i) => (i == qIndx)? ansIndx: e));
    };

    const [scores, setScores] = useState<Array<any>>([0, 0]);

    const [loading, setLoading] = useState(false);
    const [cmp, setCmp] = useState(false);
    const [block, setBlock] = useState(-1);

    const submit = async() => {
        setBlock(0);
        setCmp(true);
        setLoading(true);
        // await new Promise(r => setTimeout(r, 2000));
        try{
            const resData = await fetch(`api/question?name=${nameRef.current?.value}&ucode=${codeRef.current?.value}`,
                {
                    headers: { 'Content-Type': 'application/json' },
                    method: "POST",
                    body: JSON.stringify({
                        answers: questions.map(({_id, question}, index) =>({
                            qId: _id,
                            answer: mainQuestion.rndchoices[index][answers[index]]
                        })),
                        qIdx: mainQuestion._id
                    })
                }
            );
            const resJson = await resData.json();
            setScores([resJson.dailyscore, resJson.totalscore]);
        } catch{
            setScores(["unknow", "unknow"]);
        }
        setLoading(false);
        setBlock(1);
    };

    return (
        <>
        {cmp && 
        <div className="fixed left-0 right-0 top-0 bottom-0 m-auto z-50 max-md:w-11/12 max-md:h-11/12
            bg-card text-foreground w-96 h-56 rounded-xl ring-2 ring-border text-2xl max-md:text-lg max-sm:text-sm">
                {loading && 
                    <div className="flex flex-col items-center justify-center w-full h-full">
                    <HashLoader
                        color={"#E56211"}
                        size={64}
                    /></div>
                }
                {
                    !loading && 
                    <div className="flex flex-col w-full h-full items-center justify-center">
                        <div>คะแนนที่ได้ {scores[0]}</div>
                        <div>คะแนนรวม {scores[1]}</div>
                        <div className="mt-4 bg-foreground text-background px-4 py-2 text-lg rounded-sm max-md:text-sm max-md:px-2 max-md:py-1 
                            cursor-pointer"
                        onClick={() =>{
                            window.location.href = "http://localhost:3000/scores";
                        }}>ตารางคะแนน</div>
                    </div>
                }
        </div>
        }
        {
            block != -1 && 
            <div className="absolute left-0 top-0 h-full w-full z-40" 
            onClick={() => {
                if (block == 1)
                    window.location.href = "http://localhost:3000/scores";
            }}></div>
        }
      <div className="flex flex-col items-center w-full">
        <div className="font-bold text-6xl max-md:text-2xl max-sm:text-lg">ตอบคำถาม 3 ข้อ</div>
        {questions.map(({question, choices}, qIndx) => {
            const rndMain = mainQuestion.rndchoices[qIndx];
          return <div key={`q-${qIndx}`} className="flex flex-col w-full mt-10">
            <div key={`qq-${qIndx}`} className="font-bold text-4xl pb-4 max-md:text-xl max-sm:text-sm">{question}</div>
            {rndMain.map((rndChoiceIdx: number, ansIndx: number) => {
                return (
                    <div onClick={() => {
                        selectAns(qIndx, ansIndx)
                    }}
                        key={`qn-${qIndx}-${ansIndx}`}
                        className={`text-2xl max-md:text-lg pl-10 py-4 border-foreground border-2 mt-4 rounded-xl max-sm:text-sm 
                        ${(answers[qIndx] == ansIndx)? "bg-primary": "bg-card"} 
                        cursor-pointer`}>{choices[rndChoiceIdx]}</div>
                );
            })}
          </div>;
        })}
        <form className="mt-8 flex flex-col text-2xl items-center max-md:text-lg max-sm:text-sm">
            <label className="text-center">ชื่อ</label>
            <input type="text" ref={nameRef} className="text-background rounded-sm px-2 py-1"></input>
            <label className="mt-4 text-center">รหัสลับ</label>
            <label className="text-center italic text-lg text-primary max-md:text-sm max-sm:text-xs">ใส่รหัสเดิมเพื่อสะสมคะแนน</label>
            <input type="text" ref={codeRef} className="text-background w-44 text-center rounded-sm px-2 py-1"></input>
        </form>
        <div className="text-4xl mt-12 px-8 py-4 rounded-lg bg-primary cursor-pointer max-md:text-xl max-md:py-2 max-md:px-4 
            max-sm:text-sm"
            onClick={submit}
            >ส่งคำตอบ</div>
      </div>
      </>
      );
};
