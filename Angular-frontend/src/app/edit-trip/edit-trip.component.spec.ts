import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BewerkenTripComponent } from './edit-trip.component';

describe('BewerkenTripComponent', () => {
  let component: BewerkenTripComponent;
  let fixture: ComponentFixture<BewerkenTripComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BewerkenTripComponent]
    });
    fixture = TestBed.createComponent(BewerkenTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
