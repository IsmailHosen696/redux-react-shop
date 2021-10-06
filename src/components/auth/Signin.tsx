import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import { shopAction } from "../../redux/actionCreators";
import { StateType } from "../../redux/reducers";

export default function Signin() {
    const dispatch = useDispatch();
    const { signinUser, getUser } = bindActionCreators(shopAction, dispatch)
    const loading = useSelector((state: StateType) => state.shop.loading);
    const user = useSelector((state: StateType) => state.shop.user)
    const history = useHistory()
    useEffect(() => {
        getUser();
        if (user?.uid) {
            console.log();
            history.push('/')
        }
    })
    const handleSignin = () => {
        signinUser();
    }
    return (
        <>
            {
                loading ?
                    <p>loading...</p>
                    :
                    <div className='w-full'>
                        <div className="container mx-auto flex items-center justify-center">
                            <div className="w-96 h-96 flex justify-center flex-col">
                                <h2 className='text-center text-xl font-medium pt-8 pb-2'>Sign in To Continue redux-react-shop</h2>
                                <h2 className='text-center text-lg font-medium pt-8 pb-2'>Please Sign in To Continue</h2>
                                <button onClick={handleSignin} className='mt-20 bg-blue-600 w-full rounded h-12 flex items-center justify-center text-white '> Sign in With Google</button>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}
