import express from 'express'
import { Request, Response } from 'express';
import * as path from 'path'
import { fileURLToPath } from 'url'
import session from 'express-session'
import * as env from 'dotenv'
env.config()

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())

app.use(session({
    secret: process.env.SESSION_SECRET || "dhcsinfhiasbvvsbfvsfvbissf",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    },
}))

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const publicDirectoryPath = path.join(__dirname, 'public')

app.use(express.static(publicDirectoryPath))

//rotas publicas

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(publicDirectoryPath, 'html', 'index.html'))
})

app.get('/login', (req: Request, res: Response) => {
    res.sendFile(path.join(publicDirectoryPath, 'html', 'login.html'))
})

app.post('/verificar', (req: Request, res: Response) => {
    const {status, id, nome}: { status: boolean; id: number; nome: string } = req.body 
    
    if(id && nome) {

        if(status) {
        req.session.loggedIn = true
        req.session.username = nome
        req.session.userId = id
        
        res.json({ session: true })
        }
    }

})

app.post('/logout', (req: Request, res: Response) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Erro ao fazer logout:', err);
            return res.status(500).json({ message: 'Erro ao fazer logout.' });
        }
        res.redirect('/')

    });
})

app.get('/cadastro', (req: Request, res: Response) => {
    res.sendFile(path.join(publicDirectoryPath, 'html', 'cadastro.html'))  
})

//rotas protegidas


app.get('/home', (req: Request, res: Response) => {
    if (req.session.loggedIn) {
    res.sendFile(path.join(publicDirectoryPath, 'html', 'chat.html'))  
    } else {
        res.redirect('/login')
    }     
})



app.listen(port, () => console.log(`http://localhost:${port}`))

