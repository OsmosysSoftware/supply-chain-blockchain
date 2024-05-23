import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendShipmentComponent } from './send-shipment.component';

describe('SendShipmentComponent', () => {
  let component: SendShipmentComponent;
  let fixture: ComponentFixture<SendShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SendShipmentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SendShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
