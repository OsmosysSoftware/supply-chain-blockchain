/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { RegisteredSubscription } from 'web3/lib/commonjs/eth.exports';
import { Web3Service } from './web3.service';
import TrackingABI from '../../../artifacts/contracts/Tracking.sol/Tracking.json'; // Ensure this path is correct
import { environment } from '../../environments/environment';
import { Shipment } from '../components/shipment.interface';

@Injectable({
  providedIn: 'root',
})
export class TrackingService {
  private web3!: Web3;

  private contract: any;

  private contractAddress = environment.contractAddress;

  constructor(private web3Service: Web3Service) {
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
    await this.contract.methods
      .createShipment(
        packageId,
        receiver,
        packageName,
        distance,
        this.web3.utils.toWei(price.toString(), 'ether'),
      )
      .send({ from: accounts[0], value: this.web3.utils.toWei(price.toString(), 'ether') });
  }

  async getShipment(packageId: string): Promise<Shipment> {
    const shipment = await this.contract.methods.getShipment(packageId).call();
    return this.formatShipment(shipment);
  }

  async getAllShipments(): Promise<Shipment[]> {
    const shipments = await this.contract.methods.getAllShipments().call();
    return shipments.map((shipment: any) => this.formatShipment(shipment));
  }

  async startShipment(packageId: string): Promise<void> {
    const accounts = await this.web3.eth.getAccounts();
    await this.contract.methods.startShipment(packageId).send({ from: accounts[0] });
  }

  async completeShipment(packageId: string): Promise<void> {
    const accounts = await this.web3.eth.getAccounts();
    await this.contract.methods.completeShipment(packageId).send({ from: accounts[0] });
  }

  async getShipmentCount(sender: string): Promise<number> {
    return this.contract.methods.getShipmentsCount(sender).call();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
