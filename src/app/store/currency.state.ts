import { Currency } from "./currency.model";

export interface CurrencyState {
  loading: boolean;
  loadingFailed: boolean;
  currencies: Currency[];
  base: string;
  supportedCurrencies: string[];
}
