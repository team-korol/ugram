import firebase from 'firebase/app';
import 'firebase/auth';
import React, { useCallback, useContext, useState } from 'react';
import { RiArrowLeftSLine, RiCloseLine, RiSearch2Line } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import '../../animation/index.css';
import { MyContext } from '../../App';
import googleSiginInImage from '../../assets/btn_google_signin.png';
import logo from '../../assets/logo_icon.svg';
import { ICON, PAGE_URL, SHARE_URL_PATTERN } from '../../constants';
import LoadingSpinner from '../LoadingSpinner';
import UgramModal from '../UgramModal';
import UserInfoCard from '../UserInfoCard';
import style from './index.module.css';

const Header: React.FC = () => {
  const history = useHistory();
  const { userInfo, isGoogleAuthPending, headerText, setUserInfo } = useContext(
    MyContext
  );

  // Ugram logo関連
  const handleLogoClick = useCallback(() => {
    history.push(PAGE_URL.TOP);
  }, [history]);

  const handleBuckIconClick = useCallback(() => {
    history.goBack();
  }, [history]);

  // ログイン関連
  const handleSignInButtonClick = useCallback(() => {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/youtube');
        firebase.auth().signInWithRedirect(provider);
      });
  }, []);

  // 検索表示関連
  const [isSearchOpened, setIsSearchOpened] = useState(false);
  const [iconStatus, setIconStatus] = useState<ICON>(ICON.SERCH);
  const handleIconClick = (status: ICON) => () => {
    setIconStatus(status);
    setIsSearchOpened(!isSearchOpened);
  };

  // form入力関連
  const [value, setValue] = useState('');
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value);
    },
    [setValue]
  );
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (SHARE_URL_PATTERN.test(value)) {
        const videoId = value.split(SHARE_URL_PATTERN)[1].split(/\?/)[0];
        history.push(`${PAGE_URL.SINGLE}/${videoId}`);
      } else {
        history.push({
          pathname: PAGE_URL.SEARCH,
          search: `?q=${value}`,
        });
      }
    },
    [value, history]
  );

  // userIcon関連
  const [showUserInfo, setShowUserInfo] = useState(false);
  const handleUserIconClick = useCallback(() => {
    setShowUserInfo(true);
  }, []);

  const onCloseButtonHandler = useCallback(() => {
    setShowUserInfo(false);
  }, []);
  const handleSignOutClick = useCallback(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUserInfo && setUserInfo({});
        setShowUserInfo(false);
      })
      .catch((error) => {
        console.error(error.code, error.message);
      });
  }, [setUserInfo]);

  return (
    <>
      <header className={style.header}>
        <div className={style.head}>
          {!!headerText && (
            <>
              <button className={style.backIcon} onClick={handleBuckIconClick}>
                <RiArrowLeftSLine size="30px" />
              </button>
              <h3 className={style.headerTitle}>{headerText}</h3>
            </>
          )}
          {!headerText && (
            <h1 className={style.link}>
              <button onClick={handleLogoClick}>
                <img
                  src={logo}
                  alt="ugram"
                  width="30px"
                  height="30px"
                  loading="lazy"
                />
              </button>
            </h1>
          )}
          {!userInfo?.user && !isGoogleAuthPending && (
            <button
              className={style.googleSigin}
              onClick={handleSignInButtonClick}
            >
              <img src={googleSiginInImage} alt="google sigin in button" />
            </button>
          )}
          {!userInfo?.user && isGoogleAuthPending && <LoadingSpinner />}
          {!!userInfo?.user && (
            <>
              <button className={style.userIcon} onClick={handleUserIconClick}>
                <img
                  className={style.userIconImage}
                  src={userInfo?.user?.photoURL}
                  alt="user Icon"
                />
              </button>
              {iconStatus === ICON.SERCH && (
                <button
                  className={style.navIcon}
                  onClick={handleIconClick(ICON.CLOSE)}
                >
                  <RiSearch2Line size="30px" />
                </button>
              )}
              {iconStatus === ICON.CLOSE && (
                <button
                  className={style.navIcon}
                  onClick={handleIconClick(ICON.SERCH)}
                >
                  <RiCloseLine size="30px" />
                </button>
              )}
            </>
          )}
        </div>
        <CSSTransition
          in={isSearchOpened}
          timeout={100}
          classNames="glowAnimation"
          unmountOnExit
          onExited={() => setIsSearchOpened(false)}
        >
          <form className={style.form} onSubmit={handleSubmit}>
            <input
              className={style.input}
              placeholder="Search"
              type="text"
              value={value}
              onChange={handleChange}
              aria-label="Search"
            />
            <button className={style.submitButton} type="submit">
              <RiSearch2Line size="30px" fill="#fff" />
            </button>
          </form>
        </CSSTransition>
      </header>
      {showUserInfo && (
        <UgramModal onCloseButtonHandler={onCloseButtonHandler}>
          <UserInfoCard
            onSignOutClick={handleSignOutClick}
            onCloseButtonClick={onCloseButtonHandler}
          />
        </UgramModal>
      )}
    </>
  );
};

export default Header;
