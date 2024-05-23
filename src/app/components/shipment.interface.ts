export interface Shipment {
  packageId: string;
  sender: string;
  receiver: string;
  packageName: string;
  pickupTime: Date;
  deliveryTime: Date | null;
  distance: number;
  price: string;
  status: string;
  isPaid: boolean;
}
