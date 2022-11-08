interface IPrice {
  small: number;
  medium: number;
  large: number;
}

type TPizza = "small" | "medium" | "large";

type TAmountDiscount = {
  type: "amount";
  pizzaType: TPizza;
  discountedPrice: number;
};

type TUpsellDiscount = {
  type: "upsell";
  pizzaType: TPizza;
  get: number;
  for: number;
};

export type TPricingRules =
  | { type: "default" }
  | TAmountDiscount
  | TUpsellDiscount;

export default class Checkout {
  readonly defaulPrices: IPrice = { small: 11.99, medium: 15.99, large: 21.99 };

  private calculateTotal(prices: IPrice) {
    let total = 0;
    total += this.numberOfPizzaOrdered.small * prices.small;
    total += this.numberOfPizzaOrdered.medium * prices.medium;
    total += this.numberOfPizzaOrdered.large * prices.large;
    return Math.round((total + Number.EPSILON) * 100) / 100;
  }
  private numberOfPizzaOrdered = { small: 0, medium: 0, large: 0 };

  private pricingRules: TPricingRules;

  constructor(pricingRules: TPricingRules) {
    this.pricingRules = pricingRules;
  }

  add(item: TPizza) {
    this.numberOfPizzaOrdered[item]++;
  }

  total() {
    if (this.pricingRules.type === "default") {
      return this.calculateTotal(this.defaulPrices);
    } else if (this.pricingRules.type === "amount") {
      const prices = {
        ...this.defaulPrices,
        [this.pricingRules.pizzaType]: this.pricingRules.discountedPrice,
      };
      return this.calculateTotal(prices);
    } else if (this.pricingRules.type === "upsell") {
      const upsellTime = Math.floor(
        this.numberOfPizzaOrdered[this.pricingRules.pizzaType] /
          this.pricingRules.get
      );
      this.numberOfPizzaOrdered[this.pricingRules.pizzaType] -=
        this.pricingRules.get * upsellTime - this.pricingRules.for * upsellTime;
      return this.calculateTotal(this.defaulPrices);
    }

    return 0;
  }
}
