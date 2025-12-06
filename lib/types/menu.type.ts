type Food = {
    id: number;
    name: string;
    price: number;
    imageName: string;
};

export interface Sandwich extends Food {}
export interface Extra extends Food {}

export interface Menu {
    sandwiches: Sandwich[];
    extras: Extra[];
}
