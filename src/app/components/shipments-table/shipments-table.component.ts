import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { TrackingService } from '../../services/tracking.service';
import { ShipmentCommunicationService } from '../../services/shipment-communication.service';
import { Shipment } from '../shipment.interface';

@Component({
  selector: 'app-shipments-table',
  templateUrl: './shipments-table.component.html',
  styleUrls: ['./shipments-table.component.scss'],
})
export class ShipmentsTableComponent implements OnInit {
  shipments: Shipment[] = [];

  loading = false;

  private shipmentAddedSubscription: Subscription;

  constructor(
    private trackingService: TrackingService,
    private messageService: MessageService,
    private shipmentCommunicationService: ShipmentCommunicationService,
  ) {
    this.shipmentAddedSubscription = this.shipmentCommunicationService.shipmentAdded$.subscribe(
      () => {
        this.getShipmentList();
      },
    );
  }

  async ngOnInit(): Promise<void> {
    this.shipments = await this.trackingService.getAllShipments();
  }

  async getShipmentList() {
    this.shipments = await this.trackingService.getAllShipments();
  }

  async startShipment(id: string) {
    try {
      this.loading = true;
      await this.trackingService.startShipment(id);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Shipment started',
      });
      this.getShipmentList();
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to start shipment',
      });
    } finally {
      this.loading = false;
    }
  }

  async completeShipment(id: string) {
    try {
      this.loading = true;
      await this.trackingService.completeShipment(id);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Shipment completed',
      });
      this.getShipmentList();
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to complete shipment',
      });
    } finally {
      this.loading = false;
    }
  }

  getStatusSeverity(status: string) {
    switch (status) {
      case 'Pending':
        return 'warning';
      case 'In Transit':
        return 'info';
      case 'Delivered':
        return 'success';
      default:
        return 'contrast';
    }
  }

  getPaidSeverity(isPaid: boolean) {
    return isPaid ? 'success' : 'danger';
  }
}
