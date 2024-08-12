'use client';

import { useEffect, useState } from "react";
import "../app/loading.css";

export default function MainLoading() {
    const [count, setCount] = useState([-1, -1, -1]);
 
    useEffect(() => {
        //Implementing the setInterval method
        const interval = setInterval(() => {
            setCount([Math.floor(Math.random()*4), Math.floor(Math.random()*4), Math.floor(Math.random()*4)]);
        }, 500);
 
        //Clearing the interval
        return () => clearInterval(interval);
    }, [count]);
    return (
      <main className="flex w-screen h-screen flex-col overflow-hidden items-center justify-between p-24
         max-md:p-8 max-sm:p-2 relative">
      <div className="flex flex-col items-center w-full">
        {Array.from({length: 3}).map((e, qIndx) => {
          return <div key={`q-${qIndx}`} className="flex flex-col w-full">
            <div key={`qq-${qIndx}`} className="block font-bold text-4xl pb-4 max-md:text-xl rounded-xl mt-8
            max-sm:text-sm w-1/2 h-20 bg-muted max-md:h-14 max-md:w-5/6">{}</div>
            {Array.from({length: 4}).map((rndChoiceIdx, ansIndx) => {
                return (
                    <div key={`qn-${qIndx}-${ansIndx}`} 
                        className={`block h-16 text-2xl max-md:text-lg pl-10 py-4 border-foreground border-2 mt-2 rounded-xl max-sm:text-sm 
                          max-md:h-12 ${ansIndx == count[qIndx]? "bg-primary": "bg-card"}`}>{}</div>
                );
            })}
          </div>;
        })}
      </div>
      </main>
      );
};
