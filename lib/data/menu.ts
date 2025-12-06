import type { Menu, Sandwich, Extra } from "@/lib/types/menu.type";
import extras from "@/lib/extras.json";
import sandwiches from "@/lib/sandwich.json";

export async function getMenuData(): Promise<Menu[]> {
    return [{ extras, sandwiches }];
}

export async function getSandwiches(): Promise<Sandwich[]> {
    return sandwiches;
}

export async function getExtras(): Promise<Extra[]> {
    return extras;
}
