import { auth, firestore, provider } from "../../db/firebase"
import { carttype, productstype, usertype } from "../../types/typs"
import { ActionTypes } from "../actioTypes/actionTypes"

export const getAllItem = () => {
    return (dispatch: any) => {
        firestore
            .collection('products')
            .get()
            .then((res) => {
                const items = res.docs.map(doc => ({ id: doc.id, ...doc.data() as productstype[] }))
                dispatch({
                    type: ActionTypes.SHOW_ALL_ITEMS,
                    payload: { items }
                })
            })
    }
}
export const signinUser = () => {
    return (dispatch: any) => {
        auth
            .signInWithPopup(provider)
            .then(user => {
                if (user.additionalUserInfo?.isNewUser) {
                    const logedinuser: usertype = {
                        uid: user.user?.uid,
                        displayName: user.user?.displayName,
                        email: user.user?.email,
                        type: "user"
                    }
                    firestore.collection('users').add(logedinuser)
                    dispatch({ type: ActionTypes.SIGN_IN, payload: { user: logedinuser } })
                }
                else {
                    firestore
                        .collection('users')
                        .where('uid', '==', user.user?.uid)
                        .get()
                        .then((user) => {
                            const luser = user.docs.map(doc => ({ ...doc.data() as usertype }))[0]
                            dispatch({ type: ActionTypes.SIGN_IN, payload: { user: luser } })
                        })
                }
            }).catch(err => {
                console.log(err);
            })
    }
}
export const checkUser = () => {
    return (dispatch: any) => {
        auth
            .onAuthStateChanged(user => {
                user &&
                    firestore
                        .collection('users')
                        .where('uid', '==', user?.uid)
                        .get()
                        .then((res) => {
                            const luser = res.docs.map((doc) => doc.data() as usertype)[0]
                            dispatch({ type: ActionTypes.CHECK_USER, payload: { user: luser } })
                        })
            })
    }
}
export const signout = () => {
    return (dispatch: any) => {
        auth.signOut();
        const user: usertype = {
            uid: undefined,
            displayName: undefined,
            email: undefined,
            type: undefined
        }
        dispatch({ type: ActionTypes.SIGN_OUT, payload: { user } })
    }
}
export const addToCart = (cart: productstype, uid: string | undefined) => {
    return (dispatch: any) => {
        console.log(cart);
        firestore
            .collection('cartItem')
            .where('pid', '==', cart.id)
            .get()
            .then((res) => {
                let item = res.docs.map(res => ({ id: res.id, ...res.data() }) as carttype)[0]
                if (item) {

                    dispatch({ type: ActionTypes.UPDATE_COUNT, payload: { id: item.id } })
                    firestore.collection('cartItem').doc(item.id).update({ count: item.count + 1 })
                }
                else {
                    let item = { pid: cart.id, img: cart.img, title: cart.title, price: cart.price, details: cart.details, uid, count: 1 };
                    dispatch({ type: ActionTypes.ADD_TO_CART, payload: { item } })
                    firestore.collection('cartItem').add(item)
                }
            })
    }
}
export const showCartItem = (uid: string | undefined) => {
    return (dispatch: any) => {
        (uid !== null || uid !== undefined) && firestore
            .collection('cartItem')
            .get()
            .then((res) => {
                const data = res.docs.map(doc => ({ id: doc.id, ...doc.data() }) as carttype)
                if (uid !== undefined) {
                    let item = data.filter(i => i.uid === uid)
                    dispatch({ type: ActionTypes.SHOW_CART_ITEMS, payload: { item } })
                }
                else {
                    return
                }
            })
            .catch(e => console.log(e))
    }
}
export const updateCount = (id: string) => {
    return (dispatch: any) => {
        firestore
            .collection('cartItem')
            .doc(id)
            .get()
            .then((res) => {
                const item = res.data() as carttype
                dispatch({ type: ActionTypes.UPDATE_COUNT, payload: { id } })
                firestore.collection('cartItem').doc(id).update({ count: item.count + 1 })
            })
    }
}
export const decreaseCount = (id: string) => {
    return (dispatch: any) => {
        firestore
            .collection('cartItem')
            .doc(id)
            .get()
            .then((res) => {
                const item = res.data() as carttype
                if (item.count === 1) {
                    dispatch({ type: ActionTypes.REMOVE_FROM_CART, payload: { id } })
                    firestore
                        .collection('cartItem')
                        .doc(id)
                        .delete();
                }
                else {
                    dispatch({ type: ActionTypes.UPDATE_COUNT, payload: { id } })
                    firestore.collection('cartItem').doc(id).update({ count: item.count - 1 })
                }
            })
    }
}
export const removeFromCart = (id: string) => {
    return (dispatch: any) => {
        dispatch({ type: ActionTypes.REMOVE_FROM_CART, payload: { id } })
        firestore
            .collection('cartItem')
            .doc(id)
            .delete();
    }
}