import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTruckComponent } from './new-truck.component';

describe('NewTruckComponent', () => {
  let component: NewTruckComponent;
  let fixture: ComponentFixture<NewTruckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTruckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
