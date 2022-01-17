import React from 'react';
import { useSelector } from 'react-redux';
import AppHeader from '../components/app-header/app-header';
import ErrorMessage from '../components/error-message/error-message';
import { Loader } from '../components/loader/loader';
import Notification from '../components/notification/notification';

const Layout = (props) => {
  const {error, message, loader} = useSelector(store => store.app);

  return (
    <>
      <div className={'screen pb-10'}>
        <AppHeader />
        <main>
          {
            error ? 
              <ErrorMessage message={message} /> 
              : loader ? 
                <Loader size='large' /> 
                : props.children
          }
        </main>
      </div>
      <Notification message={message} />
    </>
  );
}

export default Layout;
