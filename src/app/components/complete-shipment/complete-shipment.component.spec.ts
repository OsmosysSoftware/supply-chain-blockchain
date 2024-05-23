import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteShipmentComponent } from './complete-shipment.component';

describe('CompleteShipmentComponent', () => {
  let component: CompleteShipmentComponent;
  let fixture: ComponentFixture<CompleteShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompleteShipmentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompleteShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
