import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMascotaComponent } from './admin-mascota.component';

describe('AdminMascotaComponent', () => {
  let component: AdminMascotaComponent;
  let fixture: ComponentFixture<AdminMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMascotaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
