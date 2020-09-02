import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Curso} from '../models/curso';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  subject = new Subject();

  constructor(private http: HttpClient) { }

  getCursos() {
    return this.http.get<Curso[]>('http://localhost:8080/cursos');
  }

  getProfesores() {
    return this.http.get<Map<number, string>>('http://localhost:8080/profesores');
  }

  postCursos(curso: Curso) {
    this.http.post<Curso>('http://localhost:8080/cursos', curso).subscribe(c => this.subject.next(c));
  }
}
