import { NextApiRequest} from 'next';
import dbconnect from '@/modules/mongodb/connect';
import User from '@/modules/mongodb/User';
import { URLSearchParams } from 'url';

interface MyObject {
  [key: string]: any;
}

export async function GET(request: Request) {
  try{
    const url = request.url;
    const sort = new URLSearchParams(url?.toString().split('?')[1])
    let sortObj: MyObject = {};
    Array.from(sort.keys()).forEach(e => {
      if (sort.get(e) != "0") sortObj[e] = parseInt((sort.get(e) as string));
    });
    await dbconnect();
    let users = await User.find({})
      .sort(sortObj);
    
    let nos: Array<any> = Array.from({length: users.length}).map(e => "--");

    if (users){
      if (sortObj.dailyscore == -1 || sortObj.totalscore == -1)
        users.forEach((e: any, index: number) =>{
          nos[index] = index + 1;
        });
      else if (sortObj.dailyscore == 1 || sortObj.totalscore == 1)
        users.forEach((e: any, index: number) =>{
          nos[index] = users.length - index;
        });
    }
    return new Response(JSON.stringify({users:users, nos: nos}), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch{
    return new Response("Error", {
      status: 504,
    });
  }
}