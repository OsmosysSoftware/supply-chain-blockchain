/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { RegisteredSubscription } from 'web3/lib/commonjs/eth.exports';
import { MessageService } from 'primeng/api';
import { Web3Service } from './web3.service';
import TrackingABI from '../../common/Tracking.json'; // Ensure this path is correct
import { environment } from '../../environments/environment';
import { Shipment } from '../components/shipment.interface';

@Injectable({
  providedIn: 'root',
})
export class TrackingService {
  private web3!: Web3;

  private contract: any;

  private contractAddress = environment.contractAddress;

  constructor(
    private web3Service: Web3Service,
    private messageService: MessageService,
  ) {
    this.web3 = this.web3Service.getWeb3Instance() as Web3<RegisteredSubscription>;

    if (this.web3) {
      this.contract = new this.web3.eth.Contract(TrackingABI.abi, this.contractAddress);
    } else {
      console.error('Web3 instance is not available');
    }
  }

  async createShipment(
    packageId: string,
    receiver: string,
    packageName: string,
    distance: number,
    price: number,
  ): Promise<void> {
    const accounts = await this.web3.eth.getAccounts();
    try {
      await this.contract.methods
        .createShipment(
          packageId,
          receiver,
          packageName,
          distance,
          this.web3.utils.toWei(price.toString(), 'ether'),
        )
        .send({ from: accounts[0], value: this.web3.utils.toWei(price.toString(), 'ether') });
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Shipment created successfully',
      });
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async getShipment(packageId: string): Promise<Shipment> {
    try {
      const shipment = await this.contract.methods.getShipment(packageId).call();
      return this.formatShipment(shipment);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async getAllShipments(): Promise<Shipment[]> {
    try {
      const shipments = await this.contract.methods.getAllShipments().call();
      return shipments.map((shipment: any) => this.formatShipment(shipment));
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async startShipment(packageId: string): Promise<void> {
    const accounts = await this.web3.eth.getAccounts();
    try {
      await this.contract.methods.startShipment(packageId).send({ from: accounts[0] });
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Shipment started successfully',
      });
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async completeShipment(packageId: string): Promise<void> {
    const accounts = await this.web3.eth.getAccounts();
    try {
      await this.contract.methods.completeShipment(packageId).send({ from: accounts[0] });
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Shipment completed successfully',
      });
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async getShipmentCount(sender: string): Promise<number> {
    try {
      return this.contract.methods.getShipmentsCount(sender).call();
    } catch (error) {
      this.handleError(error);
      return 0;
    }
  }

  async getShipmentsByAddress(): Promise<Shipment[]> {
    const accounts = await this.web3.eth.getAccounts();
    try {
      const shipments = await this.contract.methods.getShipmentsByAddress(accounts[0]).call();
      return shipments.map((shipment: any) => this.formatShipment(shipment));
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  private handleError(error: any): void {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (error.data && error.data.message) {
      errorMessage = error.data.message;
    } else if (error.message) {
      try {
        const parsedError = JSON.parse(error.message);

        if (parsedError && parsedError.value && parsedError.value.data) {
          errorMessage = parsedError.value.data.message;
        }
      } catch (e) {
        errorMessage = error.message;
      }
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Transaction Error',
      detail: errorMessage,
    });
    console.error('Error in transaction:', error);
  }

  private formatShipment(shipment: any): Shipment {
    return {
      packageId: shipment.packageId,
      sender: shipment.sender,
      receiver: shipment.receiver,
      packageName: shipment.packageName,
      pickupTime: new Date(parseInt(shipment.pickupTime, 10) * 1000),
      deliveryTime:
        shipment.deliveryTime > 0 ? new Date(parseInt(shipment.deliveryTime, 10) * 1000) : null,
      distance: parseInt(shipment.distance, 10),
      price: this.web3.utils.fromWei(shipment.price, 'ether'),
      status: this.getShipmentStatus(parseInt(shipment.status, 10)),
      isPaid: shipment.isPaid,
    };
  }

  private getShipmentStatus(status: number): string {
    switch (status) {
      case 0:
        return 'Pending';
      case 1:
        return 'In Transit';
      case 2:
        return 'Delivered';
      default:
        return 'Unknown';
    }
  }
}
