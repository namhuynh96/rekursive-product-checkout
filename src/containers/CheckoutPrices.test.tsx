import { fireEvent, render, screen } from "@testing-library/react";
import CheckoutPrices from "./CheckoutPrices";
import { ECompanySelection } from "./constants";

describe("CheckoutPrices", () => {
  const testPriceCallback = (
    numberOfSmall: number,
    numberOfMedium: number,
    numberOfLarge: number,
    company: ECompanySelection,
    expectedOutput: string
  ) => {
    render(<CheckoutPrices />);
    const smallPizzaInput = screen.getByTestId("small-input");
    fireEvent.change(smallPizzaInput, { target: { value: numberOfSmall } });
    const mediumPizzaInput = screen.getByTestId("medium-input");
    fireEvent.change(mediumPizzaInput, { target: { value: numberOfMedium } });
    const largePizzaInput = screen.getByTestId("large-input");
    fireEvent.change(largePizzaInput, { target: { value: numberOfLarge } });
    const companySelect = screen.getByTestId("company-select");
    fireEvent.change(companySelect, {
      target: { value: company },
    });
    const checkoutBtnElement = screen.getByText("Calculate");
    fireEvent.click(checkoutBtnElement);
    const priceElement = screen.getByText(expectedOutput);
    expect(priceElement).toBeInTheDocument();
  };

  test("calculate prices for default prices", () =>
    testPriceCallback(1, 1, 1, ECompanySelection.default, "Total: 49.97"));

  test("calculate prices for Facebook", () =>
    testPriceCallback(0, 5, 3, ECompanySelection.Facebook, "Total: 129.93"));

  test("calculate prices for Amazon", () =>
    testPriceCallback(0, 3, 1, ECompanySelection.Amazon, "Total: 67.96"));

  test("calculate prices for Microsoft", () =>
    testPriceCallback(3, 0, 1, ECompanySelection.Microsoft, "Total: 45.97"));
});
