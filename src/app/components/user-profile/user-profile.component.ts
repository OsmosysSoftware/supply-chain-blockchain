import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Web3Service } from '../../services/web3.service';
import { TrackingService } from '../../services/tracking.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  currentAccount: string | undefined;

  balance: string | undefined;

  networkId: string | undefined;

  networkName: string | undefined;

  shipmentCount: number | undefined;

  loading = false;

  private accountSubscription: Subscription | undefined;

  constructor(
    private web3Service: Web3Service,
    private trackingService: TrackingService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.accountSubscription = this.web3Service.accountsChanged.subscribe((account) => {
      this.currentAccount = account;

      if (this.currentAccount) {
        this.loadAccountDetails(this.currentAccount);
      }

      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.accountSubscription) {
      this.accountSubscription.unsubscribe();
    }
  }

  initialize(): void {
    this.currentAccount = this.web3Service.getAccount();

    if (this.currentAccount) {
      this.loadAccountDetails(this.currentAccount);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No wallet connected. Please connect your wallet to view profile details.',
      });
    }
  }

  async loadAccountDetails(account: string): Promise<void> {
    this.getBalance(account);
    this.getNetworkDetails();
    this.getShipmentCount(account);
  }

  async getBalance(account: string): Promise<void> {
    try {
      this.loading = true;
      this.balance = await this.web3Service.getBalance(account);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Balance fetched successfully',
      });
    } catch (error) {
      console.error('Error fetching balance', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error fetching balance',
      });
    } finally {
      this.loading = false;
    }
  }

  async getNetworkDetails(): Promise<void> {
    try {
      this.loading = true;
      this.networkId = await this.web3Service.getNetworkId();
      this.networkName = await this.web3Service.getNetworkName();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Network details fetched successfully',
      });
    } catch (error) {
      console.error('Error fetching network details', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error fetching network details',
      });
    } finally {
      this.loading = false;
    }
  }

  async getShipmentCount(account: string): Promise<void> {
    try {
      this.loading = true;
      this.shipmentCount = await this.trackingService.getShipmentCount(account);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Shipment count fetched successfully',
      });
    } catch (error) {
      console.error('Error fetching shipment count', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error fetching shipment count',
      });
    } finally {
      this.loading = false;
    }
  }
}
