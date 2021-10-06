import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { shopAction } from "../../redux/actionCreators";
import { StateType } from '../../redux/reducers';
import { productstype } from "../../types/typs";
export default function Shop() {
    const dispatch = useDispatch();
    const { addToCart, getAllItem } = bindActionCreators(shopAction, dispatch)
    useEffect(() => {
        getAllItem();
    }, []);
    const { user, items } = useSelector((state: StateType) => state.shop);
    const addtocart = (id: string) => {
        let cart: productstype = items.filter(item => item.id === id)[0];
        addToCart(cart, user?.uid)
        alert('item added')
    }
    return (
        <div className='flex flex-wrap justify-center my-5 container mx-auto'>
            {
                items.length > 0 ?
                    items.map((item) => (
                        <div key={item.id} className="flex relative xl:h-96 items-center bg-white flex-col xl:w-72 lg:w-72 w-full sm:w-5/12 p-2 m-1">
                            <div className="flex w-36 h-1/2">
                                <img src={item.img} className='w-full object-contain' alt="..." />
                            </div>
                            <div className="flex px-3 flex-col mt-2 xl:absolute xl:bottom-2">
                                <h1 className='font-medium'>{item.title}</h1>
                                <h6 className='text-sm py-1 '>{item.details}</h6>
                                <h4 className='text-sm py-1 font-medium'>$ {item.price}</h4>
                                {
                                    user?.uid !== undefined ?
                                        <button onClick={() => addtocart(item.id)} className='bg-orange-300 my-2 transition-all duration-150 hover:bg-orange-400 h-8 rounded'>Add To Cart</button>
                                        :
                                        <Link to='/signin' className='bg-orange-300 transition-all duration-150 items-center justify-center flex my-2 hover:bg-orange-400 h-8 rounded'>Add To Cart</Link>
                                }
                            </div>
                        </div>
                    ))
                    :
                    <div className='flex justify-center flex-wrap'>
                        <div className="flex flex-col m-1">
                            <Skeleton style={{ background: "#fff", borderRadius: "0" }} width={400} height={300} />
                            <Skeleton style={{ background: "#fff", borderRadius: "0" }} width={400} height={20} />
                            <Skeleton style={{ background: "#fff", borderRadius: "0" }} width={400} height={20} />
                            <Skeleton style={{ background: "#fff", borderRadius: "0" }} width={400} height={20} />
                        </div>
                        <div className="flex flex-col m-1">
                            <Skeleton style={{ background: "#fff", borderRadius: "0" }} width={400} height={300} />
                            <Skeleton style={{ background: "#fff", borderRadius: "0" }} width={400} height={20} />
                            <Skeleton style={{ background: "#fff", borderRadius: "0" }} width={400} height={20} />
                            <Skeleton style={{ background: "#fff", borderRadius: "0" }} width={400} height={20} />
                        </div>
                        <div className="flex flex-col m-1">
                            <Skeleton style={{ background: "#fff", borderRadius: "0" }} width={400} height={300} />
                            <Skeleton style={{ background: "#fff", borderRadius: "0" }} width={400} height={20} />
                            <Skeleton style={{ background: "#fff", borderRadius: "0" }} width={400} height={20} />
                            <Skeleton style={{ background: "#fff", borderRadius: "0" }} width={400} height={20} />
                        </div>
                        <div className="flex flex-col m-1">
                            <Skeleton style={{ background: "#fff", borderRadius: "0" }} width={400} height={300} />
                            <Skeleton style={{ background: "#fff", borderRadius: "0" }} width={400} height={20} />
                            <Skeleton style={{ background: "#fff", borderRadius: "0" }} width={400} height={20} />
                            <Skeleton style={{ background: "#fff", borderRadius: "0" }} width={400} height={20} />
                        </div>
                        <div className="flex flex-col m-1">
                            <Skeleton style={{ background: "#fff", borderRadius: "0" }} width={400} height={300} />
                            <Skeleton style={{ background: "#fff", borderRadius: "0" }} width={400} height={20} />
                            <Skeleton style={{ background: "#fff", borderRadius: "0" }} width={400} height={20} />
                            <Skeleton style={{ background: "#fff", borderRadius: "0" }} width={400} height={20} />
                        </div>
                        <div className="flex flex-col m-1">
                            <Skeleton style={{ background: "#fff", borderRadius: "0" }} width={400} height={300} />
                            <Skeleton style={{ background: "#fff", borderRadius: "0" }} width={400} height={20} />
                            <Skeleton style={{ background: "#fff", borderRadius: "0" }} width={400} height={20} />
                            <Skeleton style={{ background: "#fff", borderRadius: "0" }} width={400} height={20} />
                        </div>
                    </div>
            }
        </div>
    )
}
