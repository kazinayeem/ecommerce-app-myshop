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
  subcategories?: Subcategory[];
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
  union?: string;
}

export interface ProductType {
  name: string;
  value: string;
  price: number;
  stock: number;
  image?: string;
  _id: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  rating: number;
  numReviews: number;
  category: string;
  subcategory?: string[];
  type?: ProductType[];
  reviews?: Review[];
}
export interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface BigButtonProps {
  title: string;
  textcolor?: string;
  w?: number;
  h?: number;
  fs?: number;
  mt?: number;
  mb?: number;
  position?: string;
  br?: number;
  icon?: boolean;
  children?: React.ReactNode;
  action?: (title: string) => void;
  actiontitle?: string;
  bg?: string;
  disabled?: boolean;
  loading?: boolean;
}

export interface GradientButtonProps {
  title?: string;
  onPress: () => void;
  disabled?: boolean;
  colors?: [string, string, ...string[]];
}

export interface ProductBasicInfoProps {
  warranty: number;
  returnableDays: number;
  openBottomSheet: (content: React.ReactNode) => void;
}

export interface ProductColorProps {
  colorOptions: string[];
  setSelectedColor: (color: string) => void;
  selectedColor: string;
}

export interface ProductPriceProps extends ProductType {
  selectedProduct?: ProductType;
}

export interface ProductPriceVariantProps {
  priceByVariant: any[];
  setSelectedProduct: (product: any) => void;
  selectedProduct: any;
}

export interface SearchBarProps {
  isBackButtonVisible?: boolean;
  icon?: React.ReactNode;
  iconPress?: () => void;
}

export interface ProductItem {
  productId: {
    _id: string;
    name: string;
    image: string;
    price: number;
  };
  variant: string;
  color: string;
  quantity: number;
  price: number;
}
export interface Order {
  _id: string;
  totalPrice: number;
  status: string;
  paymentMethod: "bkash" | "nagad" | "cash_on_delivery" | string;
  createdAt: string;
}
