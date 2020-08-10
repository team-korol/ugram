import firebase from 'firebase/app';
import 'firebase/auth';
import React, { useCallback, useContext } from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import { MyContext } from '../../App';
import googleSiginInImage from '../../assets/btn_google_signin.png';
import logo from '../../logo_full.svg';
import style from './index.module.css';

const Header: React.FC = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  provider.addScope('https://www.googleapis.com/auth/youtube');
  provider.addScope('https://www.googleapis.com/auth/youtube.force-ssl');
  provider.addScope('https://www.googleapis.com/auth/youtube.readonly');
  const { isSignIn, userInfo, setIsSignIn, setUserInfo } = useContext(
    MyContext
  );
  const handleClick = useCallback(() => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result: any) => {
        const token = result.credential.accessToken;
        //TODO: テスト確認次第消す
        //@see https://developers.google.com/youtube/v3/guides/auth/client-side-web-apps?hl=ja
        fetch(
          `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log('test結果', data);
          });
        setIsSignIn && setIsSignIn(true);
        setUserInfo && setUserInfo(result);
      })
      .catch(({ code, message }) => {
        console.error(`${code}: ${message}`);
      });
  }, [provider, setIsSignIn, setUserInfo]);

  return (
    <header className={style.header}>
      <div className={style.link}>
        <img src={logo} alt="ugram" width="100px" height="100%" />
      </div>
      {!isSignIn && (
        <div className={style.googleSigin} onClick={handleClick}>
          <img src={googleSiginInImage} alt="google sigin in button" />
        </div>
      )}
      {isSignIn && (
        <img
          className={style.userIcon}
          src={userInfo?.user?.photoURL}
          alt="user Icon"
        />
      )}
      <RiSearch2Line size="1.5rem" className={style.serchIcon} />
    </header>
  );
};

export default Header;
