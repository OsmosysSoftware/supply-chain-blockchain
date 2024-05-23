import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { TrackingService } from '../../services/tracking.service';
import { ShipmentCommunicationService } from '../../services/shipment-communication.service';
import { Shipment } from '../shipment.interface';
import { Web3Service } from '../../services/web3.service';

@Component({
  selector: 'app-shipments-table',
  templateUrl: './shipments-table.component.html',
  styleUrls: ['./shipments-table.component.scss'],
})
export class ShipmentsTableComponent implements OnInit {
  shipments: Shipment[] = [];

  loading = false;

  private shipmentAddedSubscription: Subscription;

  private accountSubscription: Subscription;

  constructor(
    private trackingService: TrackingService,
    private messageService: MessageService,
    private shipmentCommunicationService: ShipmentCommunicationService,
    private web3Service: Web3Service,
    private cdr: ChangeDetectorRef,
  ) {
    this.shipmentAddedSubscription = this.shipmentCommunicationService.shipmentAdded$.subscribe(
      () => {
        this.getShipmentList();
      },
    );

    this.accountSubscription = this.web3Service.accountsChanged.subscribe(() => {
      this.getShipmentList();
    });
  }

  async ngOnInit(): Promise<void> {
    this.getShipmentList();
  }

  async getShipmentList() {
    try {
      this.loading = true;
      this.shipments = await this.trackingService.getShipmentsByAddress();
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error fetching shipments',
      });
      console.error('Error fetching shipments', error);
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
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
