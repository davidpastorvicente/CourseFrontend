import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {HttpService} from '../services/http.service';
import {Curso} from '../models/curso';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})

export class ShowComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  cursos: Curso[] = [];
  profesores: Map<number, string>;
  headers = ['titulo', 'profesor', 'nivel', 'horas'];
  maxVisibleItems = 5;

  constructor(private cdRef: ChangeDetectorRef, private http: HttpService) {}

  ngOnInit() {
    this.http.getProfesores().subscribe(profesores => {
      this.profesores = profesores;
      this.http.getCursos().subscribe(cursos => {
        this.cursos = cursos.filter(item => item.activo);
        this.cursos.forEach(item => item.profesor = this.profesores[item.profesor]);
        this.mdbTable.setDataSource(this.cursos);
      });
    });

    this.http.subject.subscribe(c => this.addCurso(c as Curso));
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  addCurso(c: Curso) {
    if (c.activo) {
      c.profesor = this.profesores[c.profesor];
      this.cursos.push(c);
      this.mdbTable.setDataSource(this.cursos);
    }
  }

  download(curso: Curso) {
    if (curso.temario) {
      const blob = new Blob([curso.temario]);
      saveAs(blob, curso.titulo + '.pdf');
    }
  }
}
