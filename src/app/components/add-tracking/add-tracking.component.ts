import { Component, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Web3Service } from '../../services/web3.service';
import { TrackingService } from '../../services/tracking.service';
import { ShipmentCommunicationService } from '../../services/shipment-communication.service';

@Component({
  selector: 'app-add-tracking',
  templateUrl: './add-tracking.component.html',
  styleUrls: ['./add-tracking.component.scss'],
})
export class AddTrackingComponent implements OnInit {
  trackingForm: FormGroup;

  @Output() closeDialog = new EventEmitter<void>();

  private accountSubscription: Subscription | undefined;

  sender: string | undefined;

  loading = false;

  constructor(
    private fb: FormBuilder,
    private web3Service: Web3Service,
    private trackingService: TrackingService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef,
    private shipmentCommunicationService: ShipmentCommunicationService,
  ) {
    this.trackingForm = this.fb.group({
      packageName: ['', Validators.required],
      receiver: ['', Validators.required],
      distance: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      packageId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.accountSubscription = this.web3Service.accountsChanged.subscribe((account) => {
      this.sender = account;
      this.cdr.detectChanges();
    });
  }

  async onSubmit() {
    if (this.trackingForm.valid) {
      this.loading = true;
      const { packageId, receiver, packageName, distance, price } = this.trackingForm.value;
      try {
        await this.trackingService.createShipment(
          packageId,
          receiver,
          packageName,
          distance,
          price,
        );
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Shipment created successfully',
        });
        this.shipmentCommunicationService.announceShipmentAdded();
        this.closeDialog.emit();
      } catch (error) {
        console.error('Error creating shipment', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error creating shipment',
        });
      } finally {
        this.loading = false;
      }
    }
  }

  onCancel() {
    this.trackingForm.reset();
    this.closeDialog.emit();
  }
}
