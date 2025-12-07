type Food = {
    id: number;
    name: string;
    price: number;
    type: "sandwich" | "extra";
    imageName: string;
};

export interface Sandwich extends Food {}
export interface Extra extends Food {}

export interface Menu {
    sandwiches: Sandwich[];
    extras: Extra[];
}

export interface Cart {
    sandwich: Sandwich | null;
    extra: Extra[] | Extra | null;
}
