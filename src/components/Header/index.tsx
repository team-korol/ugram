import firebase from 'firebase/app';
import 'firebase/auth';
import React, { useCallback, useContext, useState } from 'react';
import { RiArrowLeftSLine, RiCloseLine, RiSearch2Line } from 'react-icons/ri';
import { useHistory, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import '../../animation/index.css';
import { MyContext } from '../../App';
import googleSiginInImage from '../../assets/btn_google_signin.png';
import logo from '../../assets/logo_full.svg';
import { ICON, PAGE_URL, SHARE_URL_PATTERN } from '../../constants';
import style from './index.module.css';

const Header: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { userInfo, setSerchQuery, serchChannelInfo } = useContext(MyContext);

  // Ugram logo関連
  const handleLogoClick = useCallback(() => {
    history.push(PAGE_URL.TOP);
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
        setSerchQuery && setSerchQuery(videoId);
        history.push(PAGE_URL.SINGLE);
      } else {
        setSerchQuery && setSerchQuery(value);
        history.push(PAGE_URL.SEARCH);
      }
    },
    [value, setSerchQuery, history]
  );

  return (
    <header className={style.header}>
      <div className={style.head}>
        {location.pathname === PAGE_URL.CHANNEL && (
          <>
            <button
              className={style.backIcon}
              tabIndex={0}
              onClick={handleLogoClick}
            >
              <RiArrowLeftSLine size="30px" />
            </button>
            <h3 className={style.channelTitle}>
              {serchChannelInfo?.snippet.title}
            </h3>
          </>
        )}
        {location.pathname !== PAGE_URL.CHANNEL && (
          <h1 className={style.link}>
            <button onClick={handleLogoClick} tabIndex={0}>
              <img
                src={logo}
                alt="ugram"
                width="100px"
                height="30px"
                loading="lazy"
              />
            </button>
          </h1>
        )}
        {!userInfo?.user && (
          <button
            className={style.googleSigin}
            onClick={handleSignInButtonClick}
            tabIndex={0}
          >
            <img src={googleSiginInImage} alt="google sigin in button" />
          </button>
        )}
        {!!userInfo?.user && (
          <>
            <img
              className={style.userIcon}
              src={userInfo?.user?.photoURL}
              alt="user Icon"
            />
            {iconStatus === ICON.SERCH && (
              <button
                className={style.navIcon}
                onClick={handleIconClick(ICON.CLOSE)}
                tabIndex={0}
              >
                <RiSearch2Line size="30px" />
              </button>
            )}
            {iconStatus === ICON.CLOSE && (
              <button
                className={style.navIcon}
                onClick={handleIconClick(ICON.SERCH)}
                tabIndex={0}
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
            tabIndex={0}
            aria-label="Search"
          />
          <button className={style.submitButton} type="submit" tabIndex={0}>
            <RiSearch2Line size="30px" fill="#fff" />
          </button>
        </form>
      </CSSTransition>
    </header>
  );
};

export default Header;
