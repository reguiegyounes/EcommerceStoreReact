export interface Product{
    id:string;
    name:string;
    description: string;
    price:number;
    pictureUrl:string;
    type?: string;
    brand:string;
    quantityInStock:number;
}