import { Food } from "@/lib/types/menu.type";

export class DiscountCalc {
    private readonly SANDWICH_TYPE = "sandwich";
    private readonly SOFT_DRINK_NAME = "soda";
    private readonly FRIES_NAME = "fries";

    public calculateTotal(products: Food[]) {
        const normalTotal = products.reduce(
            (sum, product) => sum + product.price,
            0
        );

        let sandwichCount: number = 0;
        let extrasCount: number = 0;
        let sodaCount: number = 0;
        let friesCount: number = 0;

        products.forEach((product) => {
            if (product.type === this.SANDWICH_TYPE) {
                sandwichCount++;
            }

            if (product.type === "extra") {
                extrasCount++;

                if (product.imageName === this.SOFT_DRINK_NAME) sodaCount++;
                else if (product.imageName === this.FRIES_NAME) friesCount++;
            }
        });

        let discountPercentage = 0;

        if (sandwichCount >= 1 && extrasCount >= 2) {
            discountPercentage = 0.2;
        } else if (sandwichCount >= 1 && sodaCount >= 1) {
            discountPercentage = 0.15;
        } else if (sandwichCount >= 1 && friesCount >= 1) {
            discountPercentage = 0.1;
        }

        const finalDiscount = normalTotal * discountPercentage;
        const finalTotal = normalTotal - finalDiscount;

        return {
            normalTotal: parseFloat(normalTotal.toFixed(2)),
            finalDiscount: parseFloat(finalDiscount.toFixed(2)),
            finalTotal: parseFloat(finalTotal.toFixed(2)),
        };
    }
}
