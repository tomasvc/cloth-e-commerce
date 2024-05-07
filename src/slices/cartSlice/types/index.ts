export type Image = { url: string, alt?: string };

export interface CartItem {
    id: any;
    name: string;
    gender: string;
    color: string;
    images: any;
    price: number;
    quantity: number;
    size?: string | null;
}

export interface SliceState {
    items: Array<CartItem>;
    loading: boolean;
    error: string | null;
    actionCompleted?: string | null;
}