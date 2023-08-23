import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataboardComponent } from './databoard.component';

describe('DataboardComponent', () => {
  let component: DataboardComponent;
  let fixture: ComponentFixture<DataboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
