import { UUIDGenerator } from "../../components/auth/UUID"
import { auth, firestore, provider } from "../../db/firebase"
import { carttype, productstype, usertype } from "../../types/typs"
import { ActionTypes } from "../actioTypes/actionTypes"
export const getAllItem = () => {
    return (dispatch: any) => {
        firestore
            .collection('products')
            .onSnapshot((res) => {
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
        auth.signInWithRedirect(provider)
    }
}
export const getUser = () => {
    return (dispatch: any) => {
        auth.getRedirectResult().then(data => {
            if (data.user) {
                const user: usertype = {
                    uid: data.user.uid,
                    email: data.user.email,
                    displayName: data.user.displayName
                }
                if (data.additionalUserInfo?.isNewUser) {
                    dispatch({ type: ActionTypes.SIGN_IN, payload: { user } })
                    firestore
                        .collection('users')
                        .add(user)
                }
                else {
                    dispatch({ type: ActionTypes.SIGN_IN, payload: { user } })
                }
            } else {
            }
        }).catch(err => {
            console.log(err);
        })
    }
}
export const cuser = () => {
    return (dispatch: any) => {
        auth.onAuthStateChanged(data => {
            if (data) {
                const user: usertype = {
                    uid: data.uid,
                    email: data.email,
                    displayName: data.displayName
                }
                dispatch({ type: ActionTypes.SIGN_IN, payload: { user } })
            }
            else {
                return null
            }
        })
    }
}
export const signout = () => {
    return (dispatch: any) => {
        const user: usertype = {
            uid: undefined,
            displayName: undefined,
            email: undefined,
        }
        dispatch({ type: ActionTypes.SIGN_OUT, payload: { user } })
        auth.signOut();
    }
}
export const addToCart = (cart: productstype, uid: string | undefined) => {
    return (dispatch: any) => {
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
                    const id = UUIDGenerator()
                    let item = { id, pid: cart.id, img: cart.img, title: cart.title, price: cart.price, details: cart.details, uid, count: 1 };
                    dispatch({ type: ActionTypes.ADD_TO_CART, payload: { item } })
                    firestore.collection('cartItem').doc(id).set(item)
                }
            }).catch(err => {
                console.log(err);
            })
    }
}
export const showCartItem = (uid: string | undefined) => {
    return (dispatch: any) => {
        if (uid !== undefined) {
            firestore
                .collection('cartItem')
                .onSnapshot(snapshot => {
                    let fdata = snapshot.docs.filter((citem) => citem.data().uid === uid).map(doc => ({ id: doc.id, ...doc.data() }) as carttype)
                    dispatch({ type: ActionTypes.SHOW_CART_ITEMS, payload: { item: fdata } })
                })
        }
        else {
            console.log('no uid');
        }
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