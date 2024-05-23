import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetShipmentDetailsComponent } from './get-shipment-details.component';

describe('GetShipmentDetailsComponent', () => {
  let component: GetShipmentDetailsComponent;
  let fixture: ComponentFixture<GetShipmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetShipmentDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GetShipmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
