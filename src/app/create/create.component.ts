import {Component, OnInit} from '@angular/core';
import {HttpService} from '../services/http.service';
import {Curso} from '../models/curso';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  listProfesores = [];
  curso: Curso;

  constructor(private http: HttpService) {
    this.curso = new Curso('', 1, 25, 'Básico', true);
  }

  ngOnInit(): void {
    this.http.getProfesores().subscribe(profesores => {
      this.listProfesores = Object.entries(profesores);
    });
  }

  onSubmit() {
    this.http.postCursos(this.curso);
  }
}
