import { findAll, findById, findUser, registerUser, removeUser, upDateUser } from '../repositories/UsersRepository';

export async function getUser(){
    const users = await findUser()
    return users.map( 
        ({...user}) => ({...user})
    )
}

export async function getUsers(limit: string, skip: string){
    const users = await findAll(parseInt(limit), parseInt(skip))
    return users.map( 
        ({...user}) => ({...user})
    )
}

export async function getUsersId(id: string) {
    const user = await findById(id)
    return user.map(({...res}) => ({...res}))
}

export async function newUser(email: string, password: string){
    const user = await registerUser(email, password)
    const { insertedId } = user
    return {message: insertedId}
}

export async function updateUser(id: string, email: string, password: string){
    console.log('Controll -> ',id, email, password)
    const updateUser = await upDateUser(id, email, password)
    console.log(email, password)
    return {message: updateUser}
}

export async function deleteUser(id: string) {
    const deleteUser = await removeUser(id)
    return deleteUser
}