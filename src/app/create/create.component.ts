import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Curso} from '../models/curso';
import {HttpService} from '../services/http.service';
import {Profesor} from '../models/profesor';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent implements OnInit {

  profesores: Profesor[];
  curso: Curso;

  constructor(private http: HttpService, public dialogRef: MatDialogRef<CreateComponent>) { }

  ngOnInit(): void {
    this.http.getProfesores().subscribe(profesores => this.profesores = profesores);
  }

  close(): void {
    this.dialogRef.close();
  }
}
