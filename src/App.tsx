import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { shopAction } from './redux/actionCreators';

const Home = lazy(() => import('./components/Home'));
const Cart = lazy(() => import('./components/Cart'));
const Signin = lazy(() => import('./components/auth/Signin'));

function App() {
  const dispatch = useDispatch();
  const { checkUser } = bindActionCreators(shopAction, dispatch);
  useEffect(() => {
    checkUser();
  })
  return (
    <>
      <Router>
        <Suspense fallback={<p>loading ....</p>}>
          <Switch>
            <Route component={Home} path='/' exact />
            <Route component={Cart} path='/cart' />
            <Route component={Signin} path='/signin' />
          </Switch>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
