import {Component, OnInit, ViewChild} from '@angular/core';
import { HttpService } from '../services/http.service';
import { CreateComponent } from '../create/create.component';
import { Curso } from '../models/curso';
import { MatDialog } from '@angular/material/dialog';
import {MatTable} from '@angular/material/table';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.sass']
})
export class ShowComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<Curso[]>;
  cursos: Curso[];
  headers = ['titulo', 'profesor', 'nivel', 'horas'];

  constructor(private http: HttpService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.http.getCursos().subscribe(cursos =>
      this.cursos = cursos.filter(curso => curso.activo));

    this.http.newCurso.subscribe(curso => this.addCurso(curso));
  }

  openDialog(): void {
    this.dialog.open(CreateComponent);
  }

  addCurso(curso: Curso): void {
    if (curso.activo) {
      this.cursos.push(curso);
      this.table.renderRows();
    }
  }
}
