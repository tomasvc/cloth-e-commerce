export type Image = { url: string, alt?: string };

export interface CartItem {
    id: any;
    name: string;
    gender: string;
    color: string;
    images: any;
    price: number;
    quantity: number;
}

export interface SliceState {
    items: any[];
    loading: boolean;
    error: string | null;
    actionCompleted: string | null;
}