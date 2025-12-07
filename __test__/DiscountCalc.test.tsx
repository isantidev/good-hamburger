import { DiscountCalc } from "../app/utils/DiscountCalc";
import { describe, expect, it } from "vitest";
import { Food } from "../lib/types/menu.type";

const burger: Food = {
    id: 1,
    name: "Burger",
    price: 5.0,
    type: "sandwich",
    imageName: "burger",
};

const fries: Food = {
    id: 1,
    name: "fries",
    price: 2.0,
    type: "extra",
    imageName: "fries",
};

const soda: Food = {
    id: 2,
    name: "soda",
    price: 2.5,
    type: "extra",
    imageName: "soda",
};

describe("DiscountCalc class", () => {
    const calc = new DiscountCalc();

    const calculate = (products: Food[]) => calc.calculateTotal(products);

    const round = (num: number) => parseFloat(num.toFixed(2));

    describe("Rule 1: 1 Sandwich + 2 extras = 20% Discount", () => {
        const products: Food[] = [burger, fries, soda];
        const total = 5.0 + 2.0 + 2.5; // 9.50
        const discount = round(total * 0.2); // 9.50 * 0.2 = 1.90
        const expectedFinal = round(total - discount); // 7.60

        it("should apply 20% discount for 1 sandwich and 2 extras", () => {
            const result = calculate(products);

            expect(result.normalTotal).toBe(total);
            expect(result.finalDiscount).toBe(discount);
            expect(result.finalTotal).toBe(expectedFinal);
        });
    });

    // ---

    describe("Rule 2: 1 Sandwich + 1 Soft Drink = 15% discount", () => {
        const products: Food[] = [burger, soda];
        const total = 5.0 + 2.5; // 7.50
        const rawDiscount = total * 0.15; // 7.50 * 0.15 = 1.125
        const discount = round(rawDiscount); // 1.13
        const expectedFinal = round(total - rawDiscount);

        it("should apply 15% discount for 1 sandwich and 1 soft drink", () => {
            const result = calculate(products);

            expect(result.normalTotal).toBe(total);
            expect(result.finalDiscount).toBe(discount);
            expect(result.finalTotal).toBe(expectedFinal);
        });
    });

    // ---

    describe("Rule 3: 1 Sandwich + 1 Fries = 10% discount", () => {
        const products: Food[] = [burger, fries];
        const total = 5.0 + 2.0;
        const discount = round(total * 0.1);
        const expectedFinal = round(total - discount);

        it("should apply 10% discount for 1 sandwich and 1 fries", () => {
            const result = calculate(products);

            expect(result.normalTotal).toBe(total);
            expect(result.finalDiscount).toBe(discount);
            expect(result.finalTotal).toBe(expectedFinal);
        });
    });

    // ---

    describe("No discount cases", () => {
        it("should not apply any discount for only sandwich", () => {
            const products: Food[] = [burger];
            const total = 5.0;

            const result = calculate(products);

            expect(result.normalTotal).toBe(total);
            expect(result.finalDiscount).toBe(0.0);
            expect(result.finalTotal).toBe(total);
        });
    });
});
