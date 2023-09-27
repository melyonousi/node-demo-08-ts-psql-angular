import { Request, Response } from "express";
import { Note } from "../src/model/Note";
import { NoteRepo } from "../src/repository/NoteRepo";

class NoteController {
    async create(req: Request, res: Response) {
        try {
            const new_note: Note = new Note()
            new_note.name = req.body.name
            new_note.description = req.body.description

            await new NoteRepo().create(new_note)

            res.status(201).json({
                status: 'Creaed!',
                message: 'Successfully created note!'
            })
        } catch (err: any) {
            res.status(500).json({
                status: 'Internal Server Error!',
                message: err.message
            })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params['id'])
            await new NoteRepo().delete(id)

            res.status(200).json({
                status: 'Ok!',
                message: 'Successfully Delete note!'
            })
        } catch (err: any) {
            res.status(500).json({
                status: 'Internal Server Error!',
                message: err.message
            })
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const notes: Note[] = await new NoteRepo().getAll()

            res.status(200).json({
                status: 'Ok!',
                message: 'Successfully get All notes!',
                data: notes
            })
        } catch (err: any) {
            res.status(500).json({
                status: 'Internal Server Error!',
                message: err.message
            })
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const id: number = parseInt(req.params['id'])
            const note: Note = await new NoteRepo().getById(id)

            res.status(200).json({
                status: 'Ok!',
                message: 'Successfully get note by id!',
                data: note
            })
        } catch (err: any) {
            res.status(500).json({
                status: 'Internal Server Error!',
                message: err.message
            })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id: number = parseInt(req.params['id'])
            const note: Note = new Note()

            note.id = id
            note.name = req.body.name
            note.description = req.body.description

            await new NoteRepo().update(note)
            
            res.status(200).json({
                status: 'Ok!',
                message: 'Successfully update note!',
            })
        } catch (err: any) {
            res.status(500).json({
                status: 'Internal Server Error!',
                message: err.message
            })
        }
    }
}

export default new NoteController()