import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import { shopAction } from "../../redux/actionCreators";
import { StateType } from "../../redux/reducers";

export default function Nav() {
    const user = useSelector((state: StateType) => state.shop.user);
    const cartitem = useSelector((state: StateType) => state.shop.cartItem);
    const dispatch = useDispatch();
    const { showCartItem, signout } = bindActionCreators(shopAction, dispatch);
    const [open, setOpen] = useState<Boolean>(true)
    useEffect(() => {
        const resizeFunction = () => {
            if (window.innerWidth > 620) {
                setOpen(true);
            }
        }
        window.addEventListener('resize', resizeFunction);
        showCartItem(user?.uid);

        return () => {
            window.removeEventListener('resize', resizeFunction)
        }
    }, [user?.uid])
    return (
        <div className='flex w-full bg-amazon h-16'>
            <div className="mx-auto relative flex items-center justify-between container px-2 py-1">
                <div className="flex">
                    <Link className='text-gray-100 font-medium' to='/' >
                        redux-react-store
                    </Link>
                </div>
                <div className="flex">
                    <div className="flex sm:hidden">
                        <i className='fas fa-bars cursor-pointer text-white' onClick={() => setOpen(!open)}></i>
                    </div>
                    {
                        open &&
                        <div className="sm:static flex sm:flex-row flex-col absolute sm:bg-auto px-5 bg-amazon sm:py-0 py-5 items-end top-16 z-40 sm:w-auto w-full left-0">
                            {user?.uid !== undefined ?
                                <Link className='text-gray-200 flex sm:py-0 py-2 sm:px-2 text-sm hover:text-gray-300' title={`${user.displayName}`} to='#'>
                                    Hello, <span className='px-1 text-sm'>{user.displayName}</span>
                                </Link> :
                                <Link className='text-gray-200 text-sm sm:py-0 pb-2 sm:px-2 hover:text-gray-300' to='/signin'>
                                    Hello, Sign in
                                </Link>
                            }
                            {
                                user?.uid !== undefined &&
                                <button onClick={() => signout()} className='text-sm text-gray-200 sm:py-0 py-2 sm:px-1 hover:text-gray-300'>
                                    Signout
                                </button>
                            }
                            <NavLink className='flex items-center text-gray-200 sm:py-0 py-2 sm:pl-2 text-sm hover:text-gray-300' to='/cart'>
                                <i className="fas fa-shopping-cart"></i><span className='pl-1 font-medium'>{cartitem.length}</span>
                            </NavLink>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
