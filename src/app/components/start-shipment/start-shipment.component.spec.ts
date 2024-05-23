import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartShipmentComponent } from './start-shipment.component';

describe('StartShipmentComponent', () => {
  let component: StartShipmentComponent;
  let fixture: ComponentFixture<StartShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartShipmentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StartShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
