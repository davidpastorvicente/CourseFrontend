import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ShowComponent} from './show.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

describe('ShowComponent', () => {
  let component: ShowComponent;
  let fixture: ComponentFixture<ShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowComponent],
      imports: [HttpClientTestingModule, MDBBootstrapModule.forRoot()]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
