import { Router, Request, Response } from 'express'
import { deleteUser, getUser, getUsers, getUsersId, updateUser } from '../controllers/UsersControllers'
import { registerUser } from '../repositories/UsersRepository'

export const UserRoutes: Router = Router()

UserRoutes.get('/user', async (req: Request, res: Response) => {
    const users = await getUser()
    return res.json(users)
})

UserRoutes.get('/users', async (req: Request, res: Response) => {
    const limit: string = req.query.limit as string
    const skip: string = req.query.offset as string
    const users = await getUsers(limit, skip)
    return res.json(users)
})

UserRoutes.get('/user/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    console.log(id)
    const user = await getUsersId(id)
    return res.json(user)
})

UserRoutes.post('/users', async (req: Request, res: Response) => {
    const { email, password } = req.body
    const register = await registerUser(email, password)
    return res.json(register)
})

UserRoutes.put('/user/:id', async (req: Request, res: Response) => {
    const { email, password } = req.body
    const id: string= req.params.id as string
    const upUser = await updateUser(id, email, password)
    return res.json(upUser)
})

UserRoutes.delete('/user/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id
    const removeUser = await deleteUser(id)
    return res.json(removeUser)
})