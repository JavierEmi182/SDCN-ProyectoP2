import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageboardComponent } from './manageboard.component';

describe('ManageboardComponent', () => {
  let component: ManageboardComponent;
  let fixture: ComponentFixture<ManageboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
