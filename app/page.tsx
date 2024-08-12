import Question from "@/components/question";
import { redirect } from 'next/navigation'
import { PuffLoader } from "react-spinners";
import MainLoading from "@/components/mainloading";

async function getData(qId: string) {
  try{
    const resData = await fetch(`${process.env.NEXTAUTH_URL}/api/question?id=${qId}`, {
      method: "GET",
      cache: "no-cache",
    });

    const resJson = await resData.json();
    if (!resJson || !resJson.main.active) 
      redirect('/scores');
    return resJson;
  } catch{
    redirect('/scores');
  }

}

export default async function Page({params, searchParams}: any) {
  const {q} = await searchParams || "";
  const data = await getData(q);

  if (!data)
    return (
      <MainLoading />
    );
  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24 max-md:p-8 max-sm:p-2 relative">
        <Question questions={data}/>    
      </main>
  );
}
