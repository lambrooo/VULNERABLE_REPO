export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
}

export enum View {
  HOME,
  PRODUCTS,
  CATEGORIES,
  SEARCH,
  WISHLIST,
  ORDERS,
  REPORT
}