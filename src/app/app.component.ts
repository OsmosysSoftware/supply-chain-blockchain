import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Web3Service } from './services/web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private web3Service: Web3Service,
    private cdr: ChangeDetectorRef,
  ) {}

  title = 'supply-chain-demo';

  currentAccount: string | undefined;

  displayAddTracking = false;

  displayGetShipmentDetails = false;

  displaySendShipment = false;

  displayStartShipment = false;

  displayCompleteShipment = false;

  displayUserProfile = false;

  private accountSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.accountSubscription = this.web3Service.accountsChanged.subscribe((account) => {
      this.currentAccount = account;
      this.cdr.detectChanges();
    });
  }

  showDialog(dialog: string) {
    this.resetDialogs();
    switch (dialog) {
      case 'addTracking':
        this.displayAddTracking = true;
        break;
      case 'getShipmentDetails':
        this.displayGetShipmentDetails = true;
        break;
      case 'sendShipment':
        this.displaySendShipment = true;
        break;
      case 'startShipment':
        this.displayStartShipment = true;
        break;
      case 'completeShipment':
        this.displayCompleteShipment = true;
        break;
      case 'userProfile':
        this.displayUserProfile = true;
        break;

      default:
        break;
    }
  }

  resetDialogs() {
    this.displayAddTracking = false;
    this.displayGetShipmentDetails = false;
    this.displaySendShipment = false;
    this.displayStartShipment = false;
    this.displayCompleteShipment = false;
    this.displayUserProfile = false;
  }
}
