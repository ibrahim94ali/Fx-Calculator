import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as CurrencyActions from "./currency.actions";
import { of as observableOf, zip as observableZip } from "rxjs";
import { catchError, map, switchMap, share, first } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { Currency } from "./currency.model";
import { AppState } from "../app.state";

export interface ApiState {
  rates: object[];
  base: string;
}

@Injectable()
export class CurrencyEffects {
  @Effect() load$ = this.actions$.pipe(
    ofType(CurrencyActions.LOAD),
    switchMap(() =>
      observableZip(
        this.store.select(state => state.currency.base).pipe(first()),
        this.store
          .select(state => state.currency.supportedCurrencies)
          .pipe(first())
      )
    ),
    switchMap(([base, supportedCurrencies]) => {
      return this.http
        .get(`https://api.exchangeratesapi.io/latest?base=${base}`)
        .pipe(
          map(
            (res: any) =>
              new CurrencyActions.LoadSuccess(
                this.mapCurrenciesFromApi(
                  res.rates,
                  supportedCurrencies,
                  res.base
                ),
                res.base
              )
          ),
          catchError(() => observableOf(new CurrencyActions.LoadFail()))
        );
    }),
    share()
  );

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private store: Store<AppState>
  ) {}

  private mapCurrenciesFromApi(
    currencies: object,
    supportedLanguage: string[],
    base: string
  ): Currency[] {
    const apiCurrencies: Currency[] = [];
    for (const currency in currencies) {
      if (supportedLanguage.includes(currency) && currency !== base) {
        apiCurrencies.push({ name: currency, rate: currencies[currency] });
      }
    }
    return apiCurrencies;
  }
}
