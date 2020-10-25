import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { MyContext } from '../../App';
import style from './index.module.css';

const PrivacyPolicy: React.FC = () => {
  const { setHeaderText } = useContext(MyContext);
  setHeaderText?.('Privacy policy');
  return (
    <>
      <Helmet title="プライバシーポリシー" />
      <section className={style.wrapper}>
        <h2>プライバシーポリシー</h2>
        <section>
          <h3>個人情報の取り扱いについて</h3>
          <p>
            Ugramで取得した個人情報は以下のことを行う以外に利用することはありません。
          </p>
          <ul>
            <li>
              サービスを安全にご提供するため。サービス等を悪用した詐欺や不正アクセスなどの不正行為を調査・検出・予防したり、これらに対応することが含まれます
            </li>
            <li>お問い合わせに対応するため</li>
            <li>サービスのご利用状況等を調査、分析するため</li>
          </ul>
        </section>
        <section>
          <h3>YouTube Data API</h3>
          <p>
            Ugramでは、動画情報などを取得するためにYouTube Data
            APIを利用しています。
            <br />
            YouTube Data APIは、YouTubeの利用規約、
            およびGoogle社のプライバシーポリシーに基づいて提供されています。
            <br />
            YouTubeの利用規約、Googleプライバシーポリシーについては以下をご覧ください。
            <br />
            <a href="https://www.youtube.com/t/terms">
              利用規約 - YouTube
              <br />
              https://www.youtube.com/t/terms
            </a>
            <br />
            <a href="http://www.google.com/intl/ja/policies/privacy/">
              Googleプライバシーポリシー
              <br />
              http://www.google.com/intl/ja/policies/privacy/
            </a>
          </p>
        </section>
      </section>
    </>
  );
};

export default PrivacyPolicy;
