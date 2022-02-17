import React, {useEffect} from 'react';
import { useDispatch, useSelector } from '../../utils/hooks';
import { BrowserRouter as Router,} from 'react-router-dom';
import { getInredients } from '../../services/actions/ingredient';
import { checkAuth } from '../../services/actions/user';
import Switcher from '../switcher/switcher';
import { wsConnectionAuthStart, wsConnectionStart } from '../../services/actions/web-socket';

function App() {
  const dispatch = useDispatch();
  const {isAuthorized} = useSelector(store => store.user);
  
  useEffect(() => {
    dispatch(getInredients());
    dispatch(checkAuth());
    dispatch(wsConnectionStart())
  }, [dispatch]);
  
  useEffect(() => {
    if (isAuthorized) {
      dispatch(wsConnectionAuthStart())
    }
  }, [dispatch, isAuthorized]);
  
  return (
    <Router>
      <Switcher />
    </Router>
  );
}

export default App;
