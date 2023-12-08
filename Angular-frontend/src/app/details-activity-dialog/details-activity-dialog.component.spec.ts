import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsActivityDialogComponent } from './details-activity-dialog.component';

describe('DetailsActivityDialogComponent', () => {
  let component: DetailsActivityDialogComponent;
  let fixture: ComponentFixture<DetailsActivityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsActivityDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsActivityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
