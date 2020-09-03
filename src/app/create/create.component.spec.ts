import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CreateComponent} from './create.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateComponent],
      imports: [HttpClientTestingModule, MDBBootstrapModule.forRoot()]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
