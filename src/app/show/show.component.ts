import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {HttpService} from '../services/http.service';
import {Curso} from '../models/curso';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})

export class ShowComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  cursos: Curso[];
  profesores: Map<number, string>;
  headers = ['Título', 'Profesor', 'Nivel', 'Horas'];
  maxVisibleItems = 5;

  constructor(private cdRef: ChangeDetectorRef, private http: HttpService) {}

  ngOnInit(): void {
    this.initTable();
    this.http.subject.subscribe(() => this.initTable());
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  initTable() {
    this.http.getProfesores().subscribe(profesores => {
      this.profesores = profesores;
      this.http.getCursos().subscribe(cursos => {
        this.cursos = cursos.filter(item => item.activo);
        this.cursos.forEach(item => item.profesor = this.profesores[item.profesor]);
        this.mdbTable.setDataSource(this.cursos);
      });
    });
  }
}
