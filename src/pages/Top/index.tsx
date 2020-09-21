import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { MyContext } from '../../App';
import style from './index.module.css';

const Top: React.FC = () => {
  // 表示したい波の情報を記載する
  // const waveConfig = {
  //   UNIT: 30,
  //   waves: [
  //     {
  //       color: '#00c2ff',
  //       zoom: 1.5,
  //       delay: 0,
  //     },
  //     {
  //       color: '#fb14ff',
  //       zoom: 0.7,
  //       delay: 200,
  //     },
  //   ],
  // };
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
        {/* TODO: ガタガタするので一旦消す */}
        {/* <div className={style.wave}>
          <WaveCanvas waveConfig={waveConfig} />
        </div> */}
      </section>
    </>
  );
};

export default Top;
