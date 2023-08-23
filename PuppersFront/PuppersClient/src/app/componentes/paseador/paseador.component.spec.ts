import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaseadorComponent } from './paseador.component';

describe('PaseadorComponent', () => {
  let component: PaseadorComponent;
  let fixture: ComponentFixture<PaseadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaseadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaseadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
