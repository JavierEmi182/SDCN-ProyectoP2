import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePaseadorComponent } from './create-paseador.component';

describe('CreatePaseadorComponent', () => {
  let component: CreatePaseadorComponent;
  let fixture: ComponentFixture<CreatePaseadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePaseadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePaseadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
