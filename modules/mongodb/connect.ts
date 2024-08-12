import mongoose, {ConnectOptions} from "mongoose";

export default async function dbconnect() {
    const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPW}@${process.env.DBSTRING}?retryWrites=true&w=majority&appName=${process.env.DBCLUSTER}`;
    const clientOptions: ConnectOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch{

  }
}