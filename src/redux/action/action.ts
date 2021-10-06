import { AddToCart, CheckSignUser, DecreaseCount, RemoveFromCart, SetLoading, ShowAllItems, ShowCartItem, SignInUser, SignOut, UpdateCount } from "../actioTypes/actionTypes";
import { ShopType } from "../reducers/shopinCartReducers";

export const getAllItem = (state: ShopType, action: ShowAllItems) => {
    return {
        ...state,
        items: action.payload.items
    }
}
export const signinUser = (state: ShopType, action: SignInUser) => {
    return {
        ...state,
        user: action.payload.user
    }
}
export const checkUser = (state: ShopType, action: CheckSignUser) => {
    return {
        ...state,
        user: action.payload.user
    }
}
export const signout = (state: ShopType, action: SignOut) => {
    return {
        ...state,
        user: action.payload.user
    }
}
export const addToCart = (state: ShopType, action: AddToCart) => {
    return {
        ...state,
        cartItem: [...state.cartItem, action.payload.item]
    }
}
export const removeFromCart = (state: ShopType, action: RemoveFromCart) => {
    return {
        ...state,
        cartItem: state.cartItem.filter(item => item.id !== action.payload.id)
    }
}
export const showCartItem = (state: ShopType, action: ShowCartItem) => {
    return {
        ...state,
        cartItem: action.payload.item
    }
}
export const updateCount = (state: ShopType, action: UpdateCount) => {
    let newc = state.cartItem.map(item => {
        if (item.id === action.payload.id) {
            return {
                ...item,
                count: item.count + 1
            }
        }
        return item
    })
    return {
        ...state,
        cartItem: newc
    }
}
export const decreaseCount = (state: ShopType, action: DecreaseCount) => {
    let newc = state.cartItem.map(item => {
        if (item.id === action.payload.id) {
            return {
                ...item,
                count: item.count - 1
            }
        }
        return item
    })
    return {
        ...state,
        cartItem: newc
    }
}
export const setloading = (state: ShopType, action: SetLoading) => {
    return {
        ...state,
        loading: action.payload.loading
    }
}