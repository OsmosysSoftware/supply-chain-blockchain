/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import Web3 from 'web3';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  private web3: Web3 | undefined;

  private accounts: string[] | undefined;

  public accountsChanged = new BehaviorSubject<string | undefined>(undefined);

  public currentAccount: string | undefined;

  constructor(private messageService: MessageService) {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      this.web3 = new Web3((window as any).ethereum);
      this.listenForAccountChanges();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'MetaMask not found. Please install MetaMask extension.',
      });
    }
  }

  async connectWallet(): Promise<void> {
    if (this.web3) {
      try {
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        this.accounts = await this.web3.eth.getAccounts();
        this.setCurrentAccount(this.accounts[0]);
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User denied account access',
        });
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Web3 provider not found',
      });
    }
  }

  getAccount(): string | undefined {
    return this.currentAccount;
  }

  getAccounts(): string[] | undefined {
    return this.accounts;
  }

  async getBalance(account: string): Promise<string> {
    if (this.web3) {
      const balanceWei = await this.web3.eth.getBalance(account);
      return this.web3.utils.fromWei(balanceWei, 'ether');
    }

    throw new Error('Web3 instance is not available');
  }

  async getNetworkId(): Promise<string> {
    if (this.web3) {
      const networkId = await this.web3.eth.net.getId();
      return networkId.toString();
    }

    throw new Error('Web3 instance is not available');
  }

  async getNetworkName(): Promise<string> {
    if (this.web3) {
      const networkId = await this.web3.eth.net.getId();
      switch (parseInt(networkId.toString(), 10)) {
        case 1:
          return 'Mainnet';
        case 3:
          return 'Ropsten';
        case 4:
          return 'Rinkeby';
        case 5:
          return 'Goerli';
        case 42:
          return 'Kovan';
        default:
          return 'Unknown';
      }
    } else {
      throw new Error('Web3 instance is not available');
    }
  }

  async changeAccount(account: string): Promise<void> {
    this.setCurrentAccount(account);
  }

  private listenForAccountChanges(): void {
    if (this.web3) {
      (window as any).ethereum.on('accountsChanged', (accounts: string[]) => {
        this.accounts = accounts;
        this.setCurrentAccount(this.accounts[0]);
        this.messageService.add({
          severity: 'info',
          summary: 'Account Changed',
          detail: `Connected account changed to ${this.accounts[0]}`,
        });
      });
    }
  }

  private setCurrentAccount(account: string): void {
    this.currentAccount = account;
    this.accountsChanged.next(account);
  }

  getWeb3Instance(): Web3 | undefined {
    return this.web3;
  }
}
