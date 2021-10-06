import { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { shopAction } from './redux/actionCreators';

const Home = lazy(() => import('./components/Home'));
const Cart = lazy(() => import('./components/Cart'));
const Signin = lazy(() => import('./components/auth/Signin'));

function App() {
  const dispatch = useDispatch();
  const { cuser } = bindActionCreators(shopAction, dispatch)
  useEffect(() => {
    cuser();
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
