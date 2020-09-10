import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpService } from '../services/http.service';
import { Curso } from '../models/curso';
import { Profesor } from '../models/profesor';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent implements OnInit {

  niveles = ['Básico', 'Intermedio', 'Avanzado'];
  curso: Curso = new Curso();
  profesores: Profesor[];
  temarioFile: File;

  constructor(private http: HttpService, public dialogRef: MatDialogRef<CreateComponent>) { }

  ngOnInit(): void {
    this.http.getProfesores().subscribe(profesores => this.profesores = profesores);
  }

  create(): void {
    this.http.postCurso(this.curso).subscribe(id => {
      this.curso.id = id;
      this.temarioFile ?
        this.http.postTemario(this.temarioFile, this.curso) :
        this.http.newCurso.next(this.curso);
    });
    this.dialogRef.close();
  }

  onFileSelected(event): void {
    this.temarioFile = event.target.files[0];
    this.curso.temario = this.temarioFile.name;
  }

  getFileName(): string {
    return this.temarioFile ? this.curso.temario : 'Seleccione un archivo';
  }
}
