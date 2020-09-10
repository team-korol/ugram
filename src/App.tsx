import firebase from 'firebase/app';
import React, { useCallback, useState, useEffect, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import './App.css';
import Header from './components/Header';
import { PAGE_STATUS } from './constants';

const Channel = React.lazy(() => import('./pages/Channel'));
const Search = React.lazy(() => import('./pages/Search'));
const Top = React.lazy(() => import('./pages/Top'));
const Welcome = React.lazy(() => import('./pages/Welcome'));

type SubscriptionsItem = {
  kind: string;
  etag: any;
  id: string;
  snippet: {
    publishedAt: number;
    channelTitle: string;
    title: string;
    description: string;
    resourceId: {
      kind: string;
      channelId: string;
    };
    channelId: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
};

interface MyContextInterface {
  userInfo?: any;
  setUserInfo?: React.Dispatch<React.SetStateAction<{}>>;
  pageStatus?: PAGE_STATUS;
  setPageStatus?: React.Dispatch<React.SetStateAction<PAGE_STATUS>>;
  serchQuery?: string;
  setSerchQuery?: React.Dispatch<React.SetStateAction<string>>;
  serchChannelInfo?: SubscriptionsItem;
  setSerchChannelInfo?: React.Dispatch<
    React.SetStateAction<SubscriptionsItem | undefined>
  >;
}

export const MyContext = React.createContext<MyContextInterface>({});

const App: React.FC = () => {
  const [userInfo, setUserInfo] = useState({});
  const [pageStatus, setPageStatus] = useState<PAGE_STATUS>(
    PAGE_STATUS.WELCOME
  );
  const [serchQuery, setSerchQuery] = useState('');
  const [serchChannelInfo, setSerchChannelInfo] = useState<SubscriptionsItem>();
  const handleSignInButtonClick = useCallback(() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/youtube');
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        setPageStatus && setPageStatus(PAGE_STATUS.TOP);
        setUserInfo && setUserInfo(result);
      })
      .catch((error) => {
        console.error(error.code, error.message);
      });
  }, [setUserInfo]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [pageStatus]);

  return (
    <MyContext.Provider
      value={{
        userInfo,
        setUserInfo,
        pageStatus,
        setPageStatus,
        serchQuery,
        setSerchQuery,
        serchChannelInfo,
        setSerchChannelInfo,
      }}
    >
      <Helmet
        title="Ugram"
        meta={[
          {
            name: 'description',
            content: 'ugram is smart youtube video player',
          },
          {
            property: 'og:title',
            content: 'Ugram',
          },
          {
            property: 'og:description',
            content: 'ugram is smart youtube video player',
          },
          {
            property: 'og:image',
            content: 'https://ugram-c51b7.web.app/Ugram_logo_full.png',
          },
          {
            property: 'og:type',
            content: 'website',
          },
          {
            property: 'og:url',
            content: 'https://ugram-c51b7.web.app',
          },
          {
            name: 'twitter:card',
            content: 'summary',
          },
          {
            name: 'twitter:creator',
            content: 'korol',
          },
          {
            name: 'twitter:title',
            content: 'ugram',
          },
          {
            name: 'twitter:description',
            content: 'ugram is smart youtube video player',
          },
        ]}
      />
      <Header handleSignInButtonClick={handleSignInButtonClick} />
      <main className="main">
        <Suspense fallback="">
          {pageStatus === PAGE_STATUS.SEARCH && <Search />}
          {pageStatus === PAGE_STATUS.CHANNEL && <Channel />}
          {pageStatus === PAGE_STATUS.TOP && <Top />}
          {pageStatus === PAGE_STATUS.WELCOME && <Welcome />}
        </Suspense>
      </main>
    </MyContext.Provider>
  );
};

export default App;
