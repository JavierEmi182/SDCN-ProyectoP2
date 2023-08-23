import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaseadorComponent } from './admin-paseador.component';

describe('AdminPaseadorComponent', () => {
  let component: AdminPaseadorComponent;
  let fixture: ComponentFixture<AdminPaseadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPaseadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPaseadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
