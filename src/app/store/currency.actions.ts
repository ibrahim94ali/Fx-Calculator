import { Action } from "@ngrx/store";
import { Currency } from "./currency.model";

export const LOAD = "[CURRENCY] Load";
export const LOAD_SUCCESS = "[CURRENCY] Load Success";
export const LOAD_FAIL = "[CURRENCY] Load Fail";

export class Load implements Action {
  readonly type = LOAD;
  constructor(public base: string = "EUR") {}
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL;
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;
  constructor(public currencies: Currency[], public base: string) {}
}

export type All = Load | LoadFail | LoadSuccess;
