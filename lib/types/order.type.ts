import { Food } from "./menu.type";

export interface User {
    name: string;
}

export interface Order extends User {
    id: string;
    products: Food[];
    discount: number;
    total: number;
    totalWithDiscount: number;
    date: string;
}
