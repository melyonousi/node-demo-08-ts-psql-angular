import { Component } from '@angular/core';
import { NoteService } from '../services/notes/note.service';
import { Note } from '../model/Note';
import { Error } from '../enum/error';
import { Dialog } from '../enum/dialog';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html'
})
export class NotesComponent {

  notes: Note[] = []
  note: Note = {
    name: '',
    description: '',
    nameError: '',
    descriptionError: ''
  }
  pending: boolean = false
  dialog = Dialog
  message = {
    type: Error.SUCCESS,
    text: "",
  }

  constructor(private sNote: NoteService) { }

  ngOnInit(): void {
    this.getAllNotes()
  }

  clearMessage() {
    this.message.type = Error.SUCCESS
    this.message.text = ''
  }

  createNote() {
    this.note.nameError = ''
    this.note.descriptionError = ''
    this.pending = true
    this.sNote.createNote(this.note).subscribe(
      {
        next: (note) => {
          this.closeDialog(Dialog.CREATE);
          this.getAllNotes();
          this.note.name = '';
          this.note.description = '';
          this.message.text = note.message
        },
        error: (err: any) => {
          this.note.nameError = err?.error?.errors?.name || ''
          this.note.descriptionError = err?.error?.errors?.description || ''
        },
        complete: () => {
          this.pending = false
        }
      }
    );
    this.pending = false
  }

  updateNote(note: Note) {
    this.sNote.updateNote(note).subscribe({
      next: (res) => {
        this.closeDialog(Dialog.UPDATE);
        this.getAllNotes();
        this.message.text = res.message
      },
      error: (err) => {
        this.note.nameError = err?.error?.errors?.name || ''
        this.note.descriptionError = err?.error?.errors?.description || ''
      }
    })
  }

  deleteNote(note: Note) {
    this.pending = true
    this.sNote.deleteNote(note).subscribe({
      next: async (res: any) => {
        this.closeDialog(Dialog.DELETE)
        this.message.type = Error.SUCCESS
        this.message.text = res.message
        this.getAllNotes()
      },
      error: (err: any) => {
        this.message.type = Error.ERROR
        this.message.text = err?.error?.message
      }
    })
    this.pending = false
  }

  getNote(note: Note, dialog: Dialog) {
    this.sNote.getNote(note).subscribe({
      next: async (res) => {
        this.note = await res.data
        this.openDialog(dialog)
      },
      error: (err: any) => {
        this.message.type = Error.ERROR
        this.message.text = err?.error?.message
      }
    })
  }

  getAllNotes() {
    this.sNote.getNotes().subscribe({
      next: async (res) => {
        this.notes = await res.data
      },
      error: (err: any) => {
        this.message.type = Error.ERROR
        this.message.text = err?.error?.message
      },
    })
  }

  openDialog(id: string) {
    this.note.nameError = ''
    this.note.descriptionError = ''
    const modal: HTMLDialogElement = document.querySelector(`#${id}`) as HTMLDialogElement
    modal.showModal();
  }

  closeDialog(id: string) {
    this.note.name = ''
    this.note.description = ''
    this.note.nameError = ''
    this.note.descriptionError = ''
    const modal: HTMLDialogElement = document.querySelector(`#${id}`) as HTMLDialogElement
    modal.close();
  }
}
