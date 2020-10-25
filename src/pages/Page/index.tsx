import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { MyContext } from '../../App';
import { PAGE_URL } from '../../constants';
import firebase from 'firebase/app';
import 'firebase/auth';
import UgramModal from '../../components/UgramModal';
import UpdateCard from '../../components/UpdateCard';

const Page: React.FC = ({ children }) => {
  const { userInfo, setUserInfo, setIsGoogleAuthPending } = useContext(
    MyContext
  );
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    (async () => {
      setIsGoogleAuthPending?.(true);
      await firebase
        .auth()
        .getRedirectResult()
        .then((result) => {
          setUserInfo && setUserInfo(result);
          setIsGoogleAuthPending?.(false);
        })
        .catch((error) => {
          setIsGoogleAuthPending?.(false);
          console.error(error.code, error.message);
        });
    })();
  }, [setUserInfo, setIsGoogleAuthPending]);

  useEffect(() => {
    window.scroll({
      top: 0,
    });
  }, [pathname]);

  useEffect(() => {
    if (pathname === PAGE_URL.PRIVACY_POLICY) {
      return;
    }
    if (!userInfo?.user) {
      history.push(PAGE_URL.TOP);
    }
    if (!!userInfo?.user && pathname === PAGE_URL.TOP) {
      history.push(PAGE_URL.HOME);
    }
  }, [userInfo, history, pathname]);

  useEffect(() => {
    window.addEventListener('newContentAvailable', () => {
      setShowUpdateModal(true);
    });
  });

  const handleClick = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <>
      {children}
      {showUpdateModal && (
        <UgramModal>
          <UpdateCard
            text="サイトをアップデートしました"
            buttonText="今すぐ更新する"
            onClick={handleClick}
          />
        </UgramModal>
      )}
    </>
  );
};

export default Page;
