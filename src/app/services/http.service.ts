import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from '../models/curso';
import { Observable, Subject } from 'rxjs';
import { Profesor } from '../models/profesor';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url = 'http://localhost:8080';
  newCurso = new Subject<Curso>();

  constructor(private http: HttpClient) { }

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.url + '/cursos');
  }

  postCursos(curso: Curso): void {
    this.http.post<number>(this.url + '/cursos/', curso)
      .subscribe(id => {
        curso.id = id;
        this.newCurso.next(curso);
      });
  }

  getProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(this.url + '/profesores');
  }
}
