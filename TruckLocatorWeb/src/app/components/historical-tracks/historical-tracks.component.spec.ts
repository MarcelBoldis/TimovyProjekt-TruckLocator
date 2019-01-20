import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalTracksComponent } from './historical-tracks.component';

describe('HistoricalTracksComponent', () => {
  let component: HistoricalTracksComponent;
  let fixture: ComponentFixture<HistoricalTracksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricalTracksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
