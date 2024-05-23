import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TrackingService } from '../../services/tracking.service';

@Component({
  selector: 'app-get-shipment-details',
  templateUrl: './get-shipment-details.component.html',
  styleUrls: ['./get-shipment-details.component.scss'],
})
export class GetShipmentDetailsComponent {
  shipmentForm: FormGroup;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  shipment: any = null;

  loading = false;

  @Output() closeDialog = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private trackingService: TrackingService,
    private messageService: MessageService,
  ) {
    this.shipmentForm = this.fb.group({
      packageId: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.shipmentForm.valid) {
      this.loading = true;
      const { packageId } = this.shipmentForm.value;
      try {
        this.shipment = await this.trackingService.getShipment(packageId);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Shipment details retrieved successfully',
        });
      } catch (error) {
        console.error('Error retrieving shipment details', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error retrieving shipment details',
        });
        this.shipment = null;
      } finally {
        this.loading = false;
      }
    }
  }

  onCancel() {
    this.closeDialog.emit();
  }
}
