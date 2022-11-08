import { TPricingRules } from "../modules/checkout";

export enum ECompanySelection {
  default,
  Microsoft,
  Amazon,
  Facebook,
}

interface IPricingRulesForCompany {
  name: ECompanySelection;
  pricingRules: TPricingRules;
}

export const PRICING_RULES_FOR_COMPANY: IPricingRulesForCompany[] = [
  { name: ECompanySelection.default, pricingRules: { type: "default" } },
  {
    name: ECompanySelection.Microsoft,
    pricingRules: {
      type: "upsell",
      pizzaType: "small",
      get: 3,
      for: 2,
    },
  },
  {
    name: ECompanySelection.Amazon,
    pricingRules: {
      type: "amount",
      pizzaType: "large",
      discountedPrice: 19.99,
    },
  },
  {
    name: ECompanySelection.Facebook,
    pricingRules: {
      type: "upsell",
      pizzaType: "medium",
      get: 5,
      for: 4,
    },
  },
];
