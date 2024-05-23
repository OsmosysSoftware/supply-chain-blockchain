import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShipmentCommunicationService {
  private shipmentAddedSource = new Subject<void>();

  shipmentAdded$ = this.shipmentAddedSource.asObservable();

  announceShipmentAdded() {
    this.shipmentAddedSource.next();
  }
}
