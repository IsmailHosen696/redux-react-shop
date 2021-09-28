import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { shopAction } from "../../redux/actionCreators";
import { useHistory } from "react-router-dom";
import { StateType } from "../../redux/reducers";

export default function Signin() {
    const history = useHistory();
    const user = useSelector((state: StateType) => state.shop.user);
    useEffect(() => {
        checkAuth();
        function checkAuth() {
            if (user?.uid !== undefined) {
                return history.push('/')
            }
            return null;
        }
    })
    const dispatch = useDispatch();
    const { signinUser } = bindActionCreators(shopAction, dispatch)
    const handleSignin = () => {
        signinUser();
    }
    return (
        <div className='w-full'>
            <div className="container mx-auto flex items-center justify-center">
                <div className="w-96 h-96 flex justify-center flex-col">
                    <h2 className='text-center text-xl font-medium pt-8 pb-2'>Sign in To Continue redux-react-shop</h2>
                    <h2 className='text-center text-lg font-medium pt-8 pb-2'>Please Sign in To Continue</h2>
                    <button onClick={handleSignin} className='mt-20 bg-blue-600 w-full rounded h-12 flex items-center justify-center text-white '> Sign in With Google</button>
                </div>
            </div>
        </div>
    )
}
