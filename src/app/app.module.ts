import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { AddTrackingComponent } from './components/add-tracking/add-tracking.component';
import { GetShipmentDetailsComponent } from './components/get-shipment-details/get-shipment-details.component';
import { SendShipmentComponent } from './components/send-shipment/send-shipment.component';
import { StartShipmentComponent } from './components/start-shipment/start-shipment.component';
import { CompleteShipmentComponent } from './components/complete-shipment/complete-shipment.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ShipmentsTableComponent } from './components/shipments-table/shipments-table.component';

const primengModules = [
  ButtonModule,
  CardModule,
  DropdownModule,
  DialogModule,
  InputTextModule,
  ProgressSpinnerModule,
  TableModule,
  ToastModule,
  TagModule,
];
@NgModule({
  declarations: [
    AppComponent,
    WalletComponent,
    AddTrackingComponent,
    GetShipmentDetailsComponent,
    SendShipmentComponent,
    StartShipmentComponent,
    CompleteShipmentComponent,
    UserProfileComponent,
    ShipmentsTableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...primengModules,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
