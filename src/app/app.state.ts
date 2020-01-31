import { CurrencyState } from "./store/currency.state";

export interface AppState {
  readonly currency: CurrencyState;
}
