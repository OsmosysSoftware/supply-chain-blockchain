import { TestBed } from '@angular/core/testing';

import { ShipmentCommunicationService } from './shipment-communication.service';

describe('ShipmentCommunicationService', () => {
  let service: ShipmentCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipmentCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
