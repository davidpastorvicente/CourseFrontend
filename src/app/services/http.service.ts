import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Curso} from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url = 'http://localhost:8080/cursos';

  constructor(private http: HttpClient) { }

  getCursos() {
    return this.http.get<Curso[]>(this.url);
  }
}
