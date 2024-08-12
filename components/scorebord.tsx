'use client';

import { useEffect, useState, useRef } from "react";
import { RingLoader, HashLoader, PuffLoader } from "react-spinners";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


type t_user = {
  name: String,
  dailyscore: Number,
  totalscore: Number
}

type t_data = {
  users: Array<t_user>,
  nos: Array<any>
}


export function ScoreBord() {

  const [data, setData] = useState<t_data | null>(null);
  const [sort, setSort] = useState<Array<number>>([0, 0, -1]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [count, setCount] = useState(false);

  const fetchData = async(sort: Array<number>) =>{
      try{
        const resData = await fetch(`api/score?name=${sort[0]}&dailyscore=${sort[1]}&totalscore=${sort[2]}`, {
          method: "GET",
        });
        const jsonData = await resData.json();
        setData(jsonData);
      } catch{}
  };

  const changeSort = async(head: number) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }     
    setSort(prv => prv.map((e, i) => (i != head)? 0: (e == 0)? 1: e*(-1)));
  };

  useEffect(() => {
    const updateData = async() =>{
      // await fetchData();
      if (!intervalRef.current){
        const startInterval = () => {
          intervalRef.current = setInterval(async() => {
            await fetchData(sort);
          }, 2000);
      };
      startInterval();
    }
  }
    updateData();
  }, [sort]);

  useEffect(() => {
    const startInterval = () => {
      intervalRef.current = setInterval(async() => {
        await fetchData(sort);
      }, 2000);
    };
    startInterval();
    const getData = async() =>{
      try{
        await fetchData(sort);
      } catch{
      }
    }
    getData();

    return () => {
      if (intervalRef.current)
      clearInterval(intervalRef.current);
    };
    
  }, []);

  if (!data?.users.length)
    return (
      <div className="fixed flex flex-col left-0 right-0 top-0 bottom-0 m-auto  items-center justify-center">
      <PuffLoader
        size={160}
        color="#E56211"
      /></div>
    );

  return (
    <Table className="text-2xl max-md:text-lg max-sm:text-sm cursor-default">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ลำดับ</TableHead>
          <TableHead onClick={(e) => {
            e.preventDefault();
            changeSort(0);
            }} className={`${sort[0] != 0? "text-primary": ""}`}>ชื่อ</TableHead>
          <TableHead className={`text-right ${sort[1] != 0? "text-primary": ""}`} onClick={(e) => {
            e.preventDefault();
            changeSort(1);
          }}>คะแนนรายวัน</TableHead>
          <TableHead className={`text-right ${sort[2] != 0? "text-primary": ""}`} onClick={(e) => {
            e.preventDefault()
            changeSort(2);
            }}>คะแนนรวม</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.users.map((user, idx) => (
          <TableRow key={`user-${idx}`}>
            <TableCell className="font-medium">{data.nos[idx]}</TableCell>
            <TableCell className={`${sort[0] != 0? "text-primary": ""}`}>{user.name}</TableCell>
            <TableCell className={`text-right ${sort[1] != 0? "text-primary": ""}`}>{`${user.dailyscore}`}</TableCell>
            <TableCell className={`text-right ${sort[2] != 0? "text-primary": ""}`}>{`${user.totalscore}`}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}