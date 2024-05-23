import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Web3Service } from '../../services/web3.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit, OnDestroy {
  account: string | undefined;

  accounts: string[] | undefined;

  private accountSubscription: Subscription | undefined;

  constructor(
    private web3Service: Web3Service,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.connectWallet();
    this.accountSubscription = this.web3Service.accountsChanged.subscribe((account) => {
      this.account = account;
      this.accounts = this.web3Service.getAccounts();
      this.cdr.detectChanges();
    });
  }

  async connectWallet(): Promise<void> {
    await this.web3Service.connectWallet();
    this.loadAccount();
    this.cdr.detectChanges();
  }

  private loadAccount(): void {
    this.account = this.web3Service.getAccount();
    this.accounts = this.web3Service.getAccounts();
    this.cdr.detectChanges(); // Explicitly trigger change detection
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
}
