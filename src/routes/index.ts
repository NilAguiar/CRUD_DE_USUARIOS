import { Router } from 'express'
import { UserRoutes } from './users';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).send({api: 'Duda Lanches', message: 'O melhor lanche da região', version: '0.0.1'})
})

router.use('/', UserRoutes)

export default router;