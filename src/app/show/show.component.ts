import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../services/http.service';
import { CreateComponent } from '../create/create.component';
import { Curso } from '../models/curso';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.sass']
})
export class ShowComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  headers = ['titulo', 'profesor', 'nivel', 'horas', 'temario'];
  cursos: Curso[] = [];
  dataSource: MatTableDataSource<Curso>;
  urlTemario = 'http://localhost:8080/temarios/';

  constructor(private http: HttpService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.http.getCursos().subscribe(cursos => {
        this.cursos = cursos.filter(curso => curso.activo)
                            .sort((a, b) => a.id > b.id ? 1 : -1);

        this.dataSource = new MatTableDataSource<Curso>(this.cursos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });

    this.http.newCurso.subscribe(curso => this.addCurso(curso));
  }

  ngOnDestroy(): void {
    this.http.newCurso.unsubscribe();
  }

  openDialog(): void {
    this.dialog.open(CreateComponent);
  }

  addCurso(curso: Curso): void {
    if (curso.activo) {
      this.cursos.push(curso);
      this.dataSource.data = this.cursos;
    }
  }

  getUrl(temario: string): string {
    return this.urlTemario + temario;
  }
}
