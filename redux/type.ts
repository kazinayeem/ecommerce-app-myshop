export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  variant?: string;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  discountPrice: number;
  shippingPrice: number;
}
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface Category {
  _id: string;
  name: string;
  image: string;
  subcategory: Subcategory[];
}
export interface Subcategory {
  _id: string;
  name: string;
  image: string;
}

export interface Address {
  _id: string;
  addressLine1: string;
  addressLine2?: string;
  division: string;
  district: string;
  upazilla: string;
  zipCode: string;
  phoneNumber: string;
  country?: string;
}

export interface ProductType {
  name: string;
  value: string;
  price: number;
  stock: number;
  image: string;
  _id: string;
}
