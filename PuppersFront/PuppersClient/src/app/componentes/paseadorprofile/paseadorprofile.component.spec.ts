import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaseadorprofileComponent } from './paseadorprofile.component';

describe('PaseadorprofileComponent', () => {
  let component: PaseadorprofileComponent;
  let fixture: ComponentFixture<PaseadorprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaseadorprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaseadorprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
