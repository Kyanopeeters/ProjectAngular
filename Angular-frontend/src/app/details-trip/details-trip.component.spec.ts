import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTripComponent } from './details-trip.component';

describe('DetailsTripComponent', () => {
  let component: DetailsTripComponent;
  let fixture: ComponentFixture<DetailsTripComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DetailsTripComponent]
    });
    fixture = TestBed.createComponent(DetailsTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
