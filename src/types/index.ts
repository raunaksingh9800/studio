export type PaperType = 'A4 Plain' | 'A4 Glossy' | 'A3 Plain';

export type OrderStatus = 'Pending' | 'Printing' | 'Completed' | 'Ready for Pickup';

export interface PrintOrder {
  id: string;
  fileName: string;
  quantity: number;
  paperType: PaperType;
  status: OrderStatus;
  uploadDate: string;
  price: number;
}
