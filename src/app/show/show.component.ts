import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Curso } from '../models/curso';
import {CreateComponent} from '../create/create.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.sass']
})
export class ShowComponent implements OnInit {

  cursos: Curso[];
  headers = ['titulo', 'profesor', 'nivel', 'horas'];

  constructor(private http: HttpService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.http.getCursos().subscribe(cursos =>
      this.cursos = cursos.filter(curso => curso.activo));
  }

  openDialog(): void {
    const dialog = this.dialog.open(CreateComponent);
    dialog.afterClosed().subscribe(curso => this.add(curso));
  }

  add(curso: Curso): void {
    if (curso.activo) {
      this.cursos.push(curso);
    }
  }
}
