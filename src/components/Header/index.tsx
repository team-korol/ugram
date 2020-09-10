import 'firebase/auth';
import React, { useContext, useCallback, useState } from 'react';
import { RiSearch2Line, RiCloseLine, RiArrowLeftSLine } from 'react-icons/ri';
import { MyContext } from '../../App';
import googleSiginInImage from '../../assets/btn_google_signin.png';
import logo from '../../assets/logo_full.svg';
import style from './index.module.css';
import { CSSTransition } from 'react-transition-group';
import '../../animation/index.css';
import { PAGE_STATUS, ICON } from '../../constants';

type Props = {
  handleSignInButtonClick:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
};

const Header: React.FC<Props> = ({ handleSignInButtonClick }: Props) => {
  const {
    userInfo,
    pageStatus,
    setPageStatus,
    setSerchQuery,
    serchChannelInfo,
  } = useContext(MyContext);

  // Ugram logo関連
  const handleLogoClick = useCallback(() => {
    setPageStatus && setPageStatus(PAGE_STATUS.TOP);
  }, [setPageStatus]);

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
      setSerchQuery && setSerchQuery(value);
      setPageStatus && setPageStatus(PAGE_STATUS.SEARCH);
    },
    [value, setSerchQuery, setPageStatus]
  );

  return (
    <header className={style.header}>
      <div className={style.head}>
        {pageStatus === PAGE_STATUS.CHANNEL && (
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
        {pageStatus !== PAGE_STATUS.CHANNEL && (
          <h1 className={style.link}>
            <button onClick={handleLogoClick} tabIndex={0}>
              <img
                src={logo}
                alt="ugram"
                width="100px"
                height="31px"
                loading="lazy"
              />
            </button>
          </h1>
        )}
        {!userInfo.user && (
          <button
            className={style.googleSigin}
            onClick={handleSignInButtonClick}
            tabIndex={0}
          >
            <img src={googleSiginInImage} alt="google sigin in button" />
          </button>
        )}
        {!!userInfo.user && (
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
