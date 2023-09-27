import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from 'src/app/model/Note';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  createNote(note: Note): Observable<any> {
    return this.http.post<any>(this.apiUrl, note, httpOptions)
  }

  updateNote(note: Note): Observable<any> {
    return this.http.patch<any>(this.apiUrl + note.id, note, httpOptions)
  }

  deleteNote(note: Note): Observable<any> {
    return this.http.delete<any>(this.apiUrl + note.id)
  }

  getNote(note: Note): Observable<any> {
    return this.http.get<any>(this.apiUrl + note.id)
  }

  getNotes(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
  }
}
