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

  postCurso(curso: Curso): Observable<number> {
    return this.http.post<number>(this.url + '/cursos', curso);
  }

  getProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(this.url + '/profesores');
  }

  postTemario(temario: File, curso: Curso): void {
    const form = new FormData();
    form.append('id', curso.id.toString());
    form.append('temario', temario);

    this.http.post<Curso>(this.url + '/temarios', form)
      .subscribe(() => this.newCurso.next(curso));
  }
}
