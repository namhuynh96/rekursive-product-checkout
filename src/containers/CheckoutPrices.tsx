import { useState } from "react";

import Checkout from "../modules/checkout";
import { PRICING_RULES_FOR_COMPANY, ECompanySelection } from "./constants";
import classes from "./CheckoutPrices.module.css";

const CheckoutPrices = () => {
  const [numberOfSmall, setNumberOfSmall] = useState(0);
  const [numberOfMedium, setNumberOfMedium] = useState(0);
  const [numberOfLarge, setNumberOfLarge] = useState(0);
  const [company, setCompany] = useState<ECompanySelection>(
    ECompanySelection.default
  );

  const [totalPrice, setTotalPrice] = useState(0);

  const handleCalculatePrice = () => {
    const pricingRulesForCompany = PRICING_RULES_FOR_COMPANY.find(
      (rule) => rule.name === company
    );

    if (pricingRulesForCompany) {
      const checkout = new Checkout(pricingRulesForCompany.pricingRules);
      for (let index = 0; index < numberOfSmall; index++) {
        checkout.add("small");
      }
      for (let index = 0; index < numberOfMedium; index++) {
        checkout.add("medium");
      }
      for (let index = 0; index < numberOfLarge; index++) {
        checkout.add("large");
      }

      setTotalPrice(checkout.total());
    }
  };

  return (
    <div>
      <div className={classes.inputWrapper}>
        <div>Small pizza ($11.99)</div>
        <input
          data-testid="small-input"
          type="number"
          min={0}
          value={numberOfSmall}
          onChange={(e) => setNumberOfSmall(Number(e.target.value))}
        />
      </div>

      <div className={classes.inputWrapper}>
        <div>Medium pizza ($15.99)</div>
        <input
          data-testid="medium-input"
          type="number"
          min={0}
          value={numberOfMedium}
          onChange={(e) => setNumberOfMedium(Number(e.target.value))}
        />
      </div>

      <div className={classes.inputWrapper}>
        <div>Large pizza ($21.99)</div>
        <input
          data-testid="large-input"
          type="number"
          min={0}
          value={numberOfLarge}
          onChange={(e) => setNumberOfLarge(Number(e.target.value))}
        />
      </div>

      <div className={classes.inputWrapper}>
        <div>Customer type</div>
        <select
          data-testid="company-select"
          value={company}
          onChange={(e) => setCompany(Number(e.target.value))}
        >
          <option value={ECompanySelection.default}>Default</option>
          <option value={ECompanySelection.Facebook}>Facebook</option>
          <option value={ECompanySelection.Microsoft}>Microsoft</option>
          <option value={ECompanySelection.Amazon}>Amazon</option>
        </select>
      </div>

      <button onClick={handleCalculatePrice} className={classes.checkoutBtn}>
        Calculate
      </button>

      <div>
        <b>Total: {totalPrice}</b>
      </div>
    </div>
  );
};

export default CheckoutPrices;
