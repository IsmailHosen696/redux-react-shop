import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux";
import { shopAction } from "../../redux/actionCreators";
import { StateType } from "../../redux/reducers"

export default function Cart() {
    const cartitems = useSelector((state: StateType) => state.shop.cartItem);
    const dispatch = useDispatch();
    const { showCartItem } = bindActionCreators(shopAction, dispatch);
    const user = useSelector((state: StateType) => state.shop.user);
    useEffect(() => {
        showCartItem(user?.uid);
    }, [user?.uid])
    const { removeFromCart, updateCount, decreaseCount } = bindActionCreators(shopAction, dispatch);
    return (
        <div className='w-full'>
            <div className="container mx-auto flex">
                <div className="flex flex-col">
                    {
                        cartitems.map((item, index) => (
                            <div key={index} className="flex items-center rounded p-2 mb-3 bg-white">
                                <div className="flex w-36 ml-2">
                                    <img src={item.img} alt="..." />
                                </div>
                                <div className="flex px-5 py-2 flex-col">
                                    <div className="flex flex-col py-2">
                                        <h1 className='font-medium pb-1'>{item.title}</h1>
                                        <h1 className='py-1 text-sm'>{item.details}</h1>
                                        <h1 className='py-1'>$ <span className='font-medium'>{item.price}</span></h1>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="flex py-2">
                                            <button onClick={() => { removeFromCart(item.id); alert('item removed') }} className='bg-orange-300 h-8 px-3 rounded'>Remove From Cart</button>
                                        </div>
                                        <div className="flex py-2 pl-5 items-center">
                                            <button onClick={() => updateCount(item.id)} className='bg-orange-300 w-5 h-5 flex items-center justify-center rounded-full mx-1'>+</button>
                                            <h1 className='border px-1 rounded text-sm'>{item.count}</h1>
                                            <button onClick={() => decreaseCount(item.id)} disabled={item.count === 0} className={`${item.count === 0 ? 'bg-gray-200' : 'bg-orange-300'} w-5 h-5 flex items-center justify-center rounded-full mx-1`}>-</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="flex bg-white mx-2 rounded px-3 py-3 h-36 w-96 flex-col">
                    <h1 className='py-2'>Total {cartitems.length} items in cart</h1>
                    <h3 className='text-sm py-2'>And total price is $ <span className='font-medium '>{cartitems.reduce((r, c) => c.price * c.count + r, 0)}</span></h3>
                    <button onClick={() => alert('thanks for buying')} className='bg-orange-300 my-2 h-10 rounded'>Proceed To Checkout</button>
                </div>
            </div>
        </div>
    )
}
