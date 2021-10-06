import { carttype, productstype, usertype } from "../../types/typs";

export enum ActionTypes {
    SHOW_ALL_ITEMS = 'show-all-items',
    SHOW_CART_ITEMS = "show-cart-items",
    ADD_TO_CART = 'add-to-cart',
    UPDATE_COUNT = 'update-count',
    DECREASE_COUNT = 'decrease-count',
    REMOVE_FROM_CART = 'remove-from-cart',
    SIGN_IN = "sign-in",
    CHECK_USER = 'check-user',
    SIGN_OUT = 'sign-out',
    LOADING = 'loading'
}

export type ShowAllItems = {
    type: ActionTypes.SHOW_ALL_ITEMS,
    payload: {
        items: productstype[]
    }
}
export type SignInUser = {
    type: ActionTypes.SIGN_IN,
    payload: {
        user: usertype
    }
}
export type CheckSignUser = {
    type: ActionTypes.CHECK_USER,
    payload: {
        user: usertype
    }
}
export type SignOut = {
    type: ActionTypes.SIGN_OUT,
    payload: {
        user: usertype
    }
}
export type AddToCart = {
    type: ActionTypes.ADD_TO_CART;
    payload: {
        item: carttype,
    }
}
export type UpdateCount = {
    type: ActionTypes.UPDATE_COUNT;
    payload: {
        id: string
    }
}
export type DecreaseCount = {
    type: ActionTypes.DECREASE_COUNT;
    payload: {
        id: string
    }
}
export type RemoveFromCart = {
    type: ActionTypes.REMOVE_FROM_CART;
    payload: {
        id: string
    }
}
export type ShowCartItem = {
    type: ActionTypes.SHOW_CART_ITEMS;
    payload: {
        item: carttype[]
    }
}
export type SetLoading = {
    type: ActionTypes.LOADING;
    payload: {
        loading: boolean
    }
}
export type ShopingActionTypes = ShowAllItems |
    SignInUser |
    CheckSignUser |
    SignOut |
    ShowCartItem |
    AddToCart |
    RemoveFromCart |
    UpdateCount |
    DecreaseCount |
    SetLoading
    ;