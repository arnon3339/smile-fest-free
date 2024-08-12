import { NextApiRequest} from 'next';
import dbconnect from '@/modules/mongodb/connect';
import Questions from '@/modules/mongodb/Questions';
import Question from '@/modules/mongodb/Question';
import { URLSearchParams } from 'url';
import mongoose from 'mongoose';
import User from '@/modules/mongodb/User';

interface MyObject {
  [key: string]: any;
}

interface Answer {
  qId: string,
  answer: number
}

export async function GET(request: Request) {
  try{
    const url = request.url;
    const question = new URLSearchParams(url?.toString().split('?')[1])
    await dbconnect();
    const theQuestion = await Questions.findOne({_id: new mongoose.Types.ObjectId((question.get("id") as string))})
    const qIds: Array<String> = theQuestion.questions.map((e: string) => new mongoose.Types.ObjectId(e));
    const questions = await Question.find({_id: {"$in": qIds}}).select("question choices")
    return new Response(JSON.stringify({main: theQuestion, questions: questions}), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch{
    return new Response("Error", {
      status: 504,
    });
  }
}

export async function POST(request: Request) {
  try{
    let scores = [0, 0];
    const {answers, qIdx} = await request.json();
    const url = request.url;
    const params = new URLSearchParams(url?.toString().split('?')[1])
    let paramsObj: MyObject = {};
    Array.from(params.keys()).forEach(e => {
      paramsObj[e] = params.get(e);
    });
    await dbconnect();
    const user = await User.findOne({code: paramsObj.ucode})
    // check correction
    await Promise.all(
      answers.map(async(e: any) => {
      const correct = await Question.findOne({
        _id: new mongoose.Types.ObjectId(e.qId as string), 
        correct: e.answer
      });
      if (correct){
          scores[0] += 10;
          scores[1] += 10;
      }
      })
    );
    // score user
    if (user){
        scores[0] += user.dailyscore;
        scores[1] += user.totalscore;
        await User.updateOne({code: paramsObj.ucode}, 
            {"$set": {
                dailyscore:  scores[0],
                totalscore: scores[1],
            }}
        );
    } else{
        await User.create([
           {
                name: paramsObj.name,
                code: paramsObj.ucode,
                dayscores: [0, 0, 0],
                dailyscore: scores[0],
                totalscore: scores[1]
           }
        ]);
    }

    await Questions.updateOne({_id: new mongoose.Types.ObjectId(qIdx as string)}, {"$set": {
      active: false
    }});
    // const qIds: Array<String> = theQuestion.questions.map((e: string) => new mongoose.Types.ObjectId(e));
    // const questions = await Question.find({_id: {"$in": qIds}}).select("question choices")
    return new Response(JSON.stringify({dailyscore: scores[0], totalscore: scores[1]}), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch{
    return new Response("Error", {
      status: 504,
    });
  }
}