import { productstype, carttype, usertype } from '../../types/typs';
import { getAllItem, signinUser, checkUser, signout, addToCart, showCartItem, updateCount, decreaseCount } from '../action/action';
import { ActionTypes, ShopingActionTypes } from '../actioTypes/actionTypes';

export type ShopType = {
    items: productstype[];
    cartItem: carttype[];
    user: usertype | null;
}
const initialstate: ShopType = {
    items: [],
    cartItem: [],
    user: null
}
export const shopingCart = (state = initialstate, action: ShopingActionTypes) => {
    switch (action.type) {
        case ActionTypes.SHOW_ALL_ITEMS:
            return getAllItem(state, action);
        case ActionTypes.SIGN_IN:
            return signinUser(state, action);
        case ActionTypes.CHECK_USER:
            return checkUser(state, action);
        case ActionTypes.SIGN_OUT:
            return signout(state, action);
        case ActionTypes.SHOW_CART_ITEMS:
            return showCartItem(state, action);
        case ActionTypes.ADD_TO_CART:
            return addToCart(state, action);
        case ActionTypes.UPDATE_COUNT:
            return updateCount(state, action);
        case ActionTypes.DECREASE_COUNT:
            return decreaseCount(state, action);
        default:
            return state;
    }
}