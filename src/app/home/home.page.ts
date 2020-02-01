import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Currency } from "../store/currency.model";
import { AppState } from "../app.state";
import { Observable } from "rxjs";
import * as CurrencyActions from "../store/currency.actions";
import { filter, map } from "rxjs/operators";
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  currencies: Currency[] = [];
  amount = 1;

  loading$: Observable<boolean> = this.store
    .select(state => state.currency.loading)
    .pipe(
      filter(loading => loading !== undefined),
      map(loading => {
        return loading;
      })
    );

  loadingFailed$: Observable<boolean> = this.store
    .select(state => state.currency.loadingFailed)
    .pipe(
      filter(loadingFailed => loadingFailed !== undefined),
      map(loadingFailed => {
        return loadingFailed;
      })
    );

  currencies$: Observable<Currency[]> = this.store
    .select(state => state.currency.currencies)
    .pipe(
      filter(currencies => currencies !== undefined),
      map(currencies => {
        this.currencies = currencies;
        return currencies;
      })
    );

  base$: Observable<string> = this.store
    .select(state => state.currency.base)
    .pipe(
      filter(selected => selected !== undefined),
      map(selected => {
        return selected;
      })
    );

  constructor(private store: Store<AppState>) {
    this.store.dispatch(new CurrencyActions.Load());
  }

  changeBase(base: string) {
    this.store.dispatch(new CurrencyActions.Load(base));
  }

  tryAgain() {
    this.store.dispatch(new CurrencyActions.Load());
  }
}
