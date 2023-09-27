import express, { Application, Request, Response } from "express";
import Database from "./config/database";
import NoteRouter from "./router/NoteRouter";
import cors from 'cors'
import NoteController from "../controller/NoteController";

class App {
    public app: Application
    constructor() {
        this.app = express();
        this.cors()
        this.plugins()
        this.databaseSync()
        this.routes()
    }

    protected plugins(): void {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
    }

    protected databaseSync(): void {
        const db = new Database()
        db.sequelize?.sync()
    }

    protected routes(): void {
        this.app.route("/home").get((req: Request, res: Response) => {
            res.send("welcome home")
        })
        this.app.use("/api/notes", NoteRouter)
    }

    protected cors(): void {
        const allowedOrigins = ['http://localhost:4200']

        const corsOptions = {
            origin: (origin: any, callback: any) => {
                if (allowedOrigins.includes(origin) || !origin) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
        };
        this.app.use(cors(corsOptions))
    }
}

const port: number = 8000
const app = new App().app

app.listen(port, () => {
    console.log("server started successfully!!");
})