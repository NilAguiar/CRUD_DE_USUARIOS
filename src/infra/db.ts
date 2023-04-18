import { MongoClient } from 'mongodb';
import { User } from '../model/IUsers'

export class ConnectToDatabase{
    private client: MongoClient;
    
    constructor(
      private uri: string,
      private readonly dbName: string,
      private readonly coll: string
    ){
      this.uri = uri;
      this.dbName = dbName;
      this.coll = coll
      this.client = new MongoClient(this.uri);
    }
    
    con(){
      const database = this.client.db(this.dbName)
      const myColl = database.collection<User>(this.coll)
      return myColl
    }
}