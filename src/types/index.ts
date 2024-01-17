export type CartItem = {
    id: string;
    name: string;
    gender: string;
    color: string;
    images: Array<any>;
    price: number;
    quantity: number;
  };
  
export type FavoriteItem = {
    id: string;
    name: string;
    gender: string;
    color: string;
    images: Array<any>;
    price: number;
  };
  
export type CartSliceState = {
    items: Array<CartItem>;
    loading: boolean;
    error: string;
  };

  export type FavoriteSliceState = {
    items: Array<CartItem>;
    loading: boolean;
    error: string;
  };

export type MenuSliceState = {
    menu: any;
    loading: boolean;
    error: string | undefined;
  };

export type RootState = {
  cart: CartSliceState;
  favorites: FavoriteSliceState;
  menu: MenuSliceState;
  products: any;
  search: any;
  user: any;
  _persist?: any;
}
