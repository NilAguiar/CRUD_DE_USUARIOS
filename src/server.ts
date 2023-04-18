import { app } from './app';

const port = process.env.PORT || '3001'

const server = app.listen(port, () => console.log('Server rodando'))

process.on('SIGINT', () => {
    server.close()
    console.log('App finalizado')
})