import { combineReducers } from "redux";
import { shopingCart } from "./shopinCartReducers";

export const reducers = combineReducers({
    shop: shopingCart
});
export type StateType = ReturnType<typeof reducers>;
