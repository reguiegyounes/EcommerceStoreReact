export interface Basket {
    id:      string;
    buyerId: string;
    items:   BasketItem[];
}

export interface BasketItem {
    productId:  string;
    quantity:   number;
    name:       string;
    price:      number;
    pictureUrl: string;
    type:       string;
    brand:      string;
}