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
  fileTitle: string;
  file: File;

  constructor(private http: HttpService) {
    this.curso = new Curso('', 1, 25, 'Básico', true);
  }

  ngOnInit(): void {
    console.log(this.file);
    this.fileTitle = 'Seleccione el archivo';
    this.http.getProfesores().subscribe(profesores => {
      this.listProfesores = Object.entries(profesores);
    });
  }

  onSubmit() {
    if (this.file) { this.http.subject.subscribe(c =>
      this.http.postTemario(this.file, (c as Curso).id));
    }

    this.http.postCursos(this.curso);
  }

  addTemario(event) {
    this.file = event.target.files.item(0);
  }
}
