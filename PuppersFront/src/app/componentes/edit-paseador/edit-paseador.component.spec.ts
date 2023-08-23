import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaseadorComponent } from './edit-paseador.component';

describe('EditPaseadorComponent', () => {
  let component: EditPaseadorComponent;
  let fixture: ComponentFixture<EditPaseadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPaseadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPaseadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
