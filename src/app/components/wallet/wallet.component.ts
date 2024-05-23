import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Web3Service } from '../../services/web3.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit, OnDestroy {
  account: string | undefined;

  balance: string | undefined;

  accounts: string[] | undefined;

  private accountSubscription: Subscription | undefined;

  constructor(
    private web3Service: Web3Service,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService,
  ) {
    this.accountSubscription = this.web3Service.accountsChanged.subscribe((account) => {
      this.account = account;
      this.accounts = this.web3Service.getAccounts();

      if (this.account) {
        this.getBalance(this.account);
      }

      // this.cdr.detectChanges();
    });
  }

  ngOnInit(): void {
    this.connectWallet();
  }

  async connectWallet(): Promise<void> {
    await this.web3Service.connectWallet();
    this.loadAccount();
    this.cdr.detectChanges();
  }

  private loadAccount(): void {
    this.account = this.web3Service.getAccount();
    this.accounts = this.web3Service.getAccounts();

    if (this.account) {
      this.getBalance(this.account);
    }

    this.cdr.detectChanges(); // Explicitly trigger change detection
  }

  async getBalance(account: string): Promise<void> {
    try {
      this.balance = await this.web3Service.getBalance(account);
    } catch (error) {
      console.error('Error fetching balance', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error fetching balance',
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async changeAccount(event: any): Promise<void> {
    const selectedAccount = event.value;
    await this.web3Service.changeAccount(selectedAccount);
    this.loadAccount();
    this.cdr.detectChanges(); // Explicitly trigger change detection
  }

  ngOnDestroy(): void {
    if (this.accountSubscription) {
      this.accountSubscription.unsubscribe();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleError(error: any): void {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (error.data && error.data.message) {
      errorMessage = error.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Transaction Error',
      detail: errorMessage,
    });
    console.error('Error in transaction:', error);
  }
}
