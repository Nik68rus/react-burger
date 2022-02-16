import React, {useEffect} from 'react';
import { useDispatch } from '../../utils/hooks';
import { BrowserRouter as Router,} from 'react-router-dom';
import { getInredients } from '../../services/actions/ingredient';
import { checkAuth } from '../../services/actions/user';
import Switcher from '../switcher/switcher';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getInredients());
    dispatch(checkAuth());
  }, [dispatch]);
  
  return (
    <Router>
      <Switcher />
    </Router>
  );
}

export default App;
