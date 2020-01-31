import * as CurrencyActions from "./currency.actions";
import { CurrencyState } from "./currency.state";

const initialState: CurrencyState = {
  loading: false,
  loadingFailed: false,
  currencies: [],
  base: "EUR",
  supportedCurrencies: ["EUR", "USD", "GBP", "AUD", "CHF", "CAD", "JPY", "NZD"]
};

export function reducer(
  state: CurrencyState = initialState,
  action: CurrencyActions.All
) {
  switch (action.type) {
    case CurrencyActions.LOAD:
      return {
        ...state,
        loading: true,
        loadingFailed: false,
        base: action.base
      };

    case CurrencyActions.LOAD_FAIL:
      return { ...state, loading: false, loadingFailed: true };

    case CurrencyActions.LOAD_SUCCESS:
      return {
        ...state,
        currencies: action.currencies,
        base: action.base,
        loading: false,
        loadingFailed: false
      };

    default:
      return state;
  }
}
