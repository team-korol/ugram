import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { MyContext } from '../../App';
import style from './index.module.css';
import { Link } from 'react-router-dom';
import { PAGE_URL } from '../../constants';

const Top: React.FC = () => {
  const { setHeaderText } = useContext(MyContext);
  setHeaderText?.(null);
  return (
    <>
      <Helmet title="Ugram" />
      <section className={style.wrapper}>
        <div className={style.spacer} />
        <p className={style.message}>
          THE
          <br />
          MOST
          <br />
          SIMPLE
          <br />
          YOUTUBE
          <br />
          APPLICATION
        </p>
        <div className={style.spacer} />
        <Link className={style.privacyPolicy} to={PAGE_URL.PRIVACY_POLICY}>
          Privacy policy
        </Link>
      </section>
    </>
  );
};

export default Top;
