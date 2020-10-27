import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { MyContext } from '../../App';
import { PAGE_URL } from '../../constants';
import style from './index.module.css';

const Home: React.FC = () => {
  const { setHeaderText } = useContext(MyContext);
  setHeaderText?.(null);

  return (
    <>
      <Helmet title="Top | Ugram" />
      <section className={style.section}>
        <ul className={style.list}>
          <li className={style.item}>
            <Link className={style.link} to={PAGE_URL.VIDEOS_SUBSCRIPTIONS}>
              VIDEOS
            </Link>
          </li>
          <li className={style.item}>
            <Link className={style.link} to={PAGE_URL.PLAYLIST_SUBSCRIPTIONS}>
              PLAY LIST
            </Link>
          </li>
          <li className={style.item}>
            <Link className={style.link} to={PAGE_URL.PRIVACY_POLICY}>
              PRIVACY POLICY
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Home;
