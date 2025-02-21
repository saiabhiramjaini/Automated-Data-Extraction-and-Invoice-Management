export interface Invoice {
  serialNumber: string;
  customerName: string;
  productName: string;
  quantity: string;
  totalAmount: string;
  date: string;
}

export interface Product {
  name: string;
  quantity: string;
  unitPrice: string;
  tax: string;
  priceWithTax: string;
  discount: string;
}

export interface Customer {
  customerName: string;
  phoneNumber: string;
  totalPurchaseAmount: string;
}
