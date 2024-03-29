import React, {FC} from 'react';
import PropTypes from 'prop-types';
import { useSelector } from '../utils/hooks';
import AppHeader from '../components/app-header/app-header';
import ErrorMessage from '../components/error-message/error-message';
import { Loader } from '../components/loader/loader';
import Notification from '../components/notification/notification';

const Layout: FC = ({children}) => {
  const {error, message, loader} = useSelector(store => store.app);

  return (
    <>
      <div className={'screen pb-10'}>
        <AppHeader />
        <main>
          {
            error ? 
              <ErrorMessage message={message} /> 
              : loader ? <div className="mt-20">
                <Loader size='large' /> 
              </div>
                : children
          }
        </main>
      </div>
      <Notification message={message} />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Layout;
