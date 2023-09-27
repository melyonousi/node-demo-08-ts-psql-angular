import NoteController from "../../controller/NoteController";
import validate from "../helper/validate";
import { createNoteSchema, updateNoteSchema } from "../schema/NoteSchema";
import BaseRoutes from "./base/BaseRoutes";

class NoteRoutes extends BaseRoutes {
    public routes(): void {
        this.router.post('', validate(createNoteSchema), NoteController.create)
        this.router.patch('/:id', validate(updateNoteSchema), NoteController.update)
        this.router.delete('/:id', NoteController.delete)
        this.router.get('/:id', NoteController.findById)
        this.router.get('', NoteController.findAll)
    }
}

export default new NoteRoutes().router