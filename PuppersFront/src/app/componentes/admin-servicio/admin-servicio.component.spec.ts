import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminServicioComponent } from './admin-servicio.component';

describe('AdminServicioComponent', () => {
  let component: AdminServicioComponent;
  let fixture: ComponentFixture<AdminServicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminServicioComponent]
    });
    fixture = TestBed.createComponent(AdminServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
