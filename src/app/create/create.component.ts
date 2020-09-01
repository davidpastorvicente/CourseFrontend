import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  listProfesores = [];
  courseTitle: string;

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.http.getProfesores().subscribe(profesores => {
      this.listProfesores = Object.entries(profesores);
    });
  }

}
