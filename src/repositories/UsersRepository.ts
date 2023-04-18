import { ObjectId } from 'mongodb';
import { ConnectToDatabase } from '../infra/db';
import { config } from 'dotenv';

config();
const url = process.env.URL || "localhost:27017";
const database = process.env.DATABASE || "db_name";
const collection_name = process.env.COLLECTION_NAME || "collection_name";

const con = new ConnectToDatabase(
    url,
    database,
    collection_name
)

export async function findUser(){
    const users = await con.con().find({}).skip(0).limit(10).toArray()
    return users.map(({ ...rest }) => ({ ...rest }))
}

export async function findAll(limit: number, skip: number){
    const users = await con.con().find({}).skip(skip).limit(limit).toArray()
    return users.map(({ ...rest }) => ({ ...rest }))
}

export async function findById(id: string){
    const users = await con.con().find({ _id: new ObjectId(id) }).toArray()
    return users.map(d => { return d })
}

export async function upDateUser(id: string, email: string, password: string){
    console.log('Repos -> ',id, email, password)
    const userUpdate = await con.con().updateOne(
        { _id: new ObjectId(id) },
        {
            $set: { "email": email, "password": password }
        }
    )
    if(userUpdate.matchedCount == 1 && userUpdate.modifiedCount == 1){
        return {message: `User update success!`, 'Status': userUpdate.acknowledged}
    }else {
        return {message: `User not modified!`}
    }
}

export async function removeUser(id: string){

    const del = await con.con().findOneAndDelete({
        _id: new ObjectId(id)
    })

    return {message: del.ok, status: `User: ${del.value?.email} removed!`, error: del.lastErrorObject} 
}

export async function registerUser(email: string, password: string){
    const newUser = con.con().insertOne({ "email": email, "password": password })
    return (await newUser)
}
