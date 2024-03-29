import React, {FC} from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkAuth } from '../../services/actions/user';
import { useDispatch, useSelector } from '../../utils/hooks';
import { Paths } from '../../utils/data';

interface IProtectedRoute {
  path: string;
  exact?: boolean;
  rest?: any;
}

export const ProtectedRoute: FC<IProtectedRoute> = ({ children, ...rest }) => {
  const [isUserLoaded, setUserLoaded] = useState(false);
  const dispatch = useDispatch();
  const isAuthorized = useSelector(store => store.user.isAuthorized);

  useEffect(() => {
    dispatch(checkAuth());
    setUserLoaded(true);    
  }, [dispatch]);

  if (!isUserLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) => isAuthorized ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: Paths.LOGIN,
              state: { from: location, oldState: location.state }
            }}
          />
        )
      }
    />
  );
}
