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

  profesores: Profesor[];
  curso: Curso = new Curso();
  fileName = 'Seleccione un archivo';
  niveles = ['Básico', 'Intermedio', 'Avanzado'];

  constructor(private http: HttpService, public dialogRef: MatDialogRef<CreateComponent>) { }

  ngOnInit(): void {
    this.http.getProfesores().subscribe(profesores => this.profesores = profesores);
  }

  close(): void {
    this.dialogRef.close();
  }

  create(): void {
    this.http.postCursos(this.curso);
    this.dialogRef.close();
  }

  onFileSelected(event): void {
    this.fileName = event.target.files[0].name;
  }

  chooseProfesor(index): void {
    this.curso.profesor = this.profesores[index];
  }
}
