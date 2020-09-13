import React, { useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { MyContext } from '../../App';
import { PAGE_URL } from '../../constants';
import firebase from 'firebase/app';
import 'firebase/auth';

const Page: React.FC = ({ children }) => {
  const { userInfo, setUserInfo } = useContext(MyContext);
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    (async () => {
      await firebase
        .auth()
        .getRedirectResult()
        .then((result) => {
          setUserInfo && setUserInfo(result);
        })
        .catch((error) => {
          console.error(error.code, error.message);
        });
    })();
  }, [setUserInfo]);

  useEffect(() => {
    if (!userInfo?.user) {
      history.push(PAGE_URL.TOP);
    }
    if (!!userInfo?.user && location.pathname === PAGE_URL.TOP) {
      history.push(PAGE_URL.HOME);
    }
  }, [userInfo, history, location.pathname]);
  return <>{children}</>;
};

export default Page;
