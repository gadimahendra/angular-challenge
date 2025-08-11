import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AircraftsResponsesComponent } from './aircrafts-responses.component';

describe('AircraftsResponsesComponent', () => {
  let component: AircraftsResponsesComponent;
  let fixture: ComponentFixture<AircraftsResponsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AircraftsResponsesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AircraftsResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
