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
  temario: File;

  constructor(private http: HttpService, public dialogRef: MatDialogRef<CreateComponent>) { }

  ngOnInit(): void {
    this.http.getProfesores().subscribe(profesores => this.profesores = profesores);
  }

  create(): void {
    this.http.postCursos(this.curso);
    this.dialogRef.close();
  }

  onFileSelected(event): void {
    this.temario = event.target.files[0];
  }

  getFileName(): string {
    return this.temario ? this.temario.name : 'Seleccione un archivo';
  }
}
