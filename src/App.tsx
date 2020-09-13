import React, { Suspense, useState } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
const Page = React.lazy(() => import('./pages/Page'));
const Channel = React.lazy(() => import('./pages/Channel'));
const Search = React.lazy(() => import('./pages/Search'));
const Home = React.lazy(() => import('./pages/Home'));
const Welcome = React.lazy(() => import('./pages/Welcome'));
const SinglePlayer = React.lazy(() => import('./pages/SinglePlayer'));
const PlayListHome = React.lazy(() => import('./pages/PlayListHome'));
const PlayListInfo = React.lazy(() => import('./pages/PlayListInfo'));
const PlayList = React.lazy(() => import('./pages/PlayList'));

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

type PlayListItem = {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
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
      standard: {
        url: string;
        width: number;
        height: number;
      };
      maxres: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    localized: {
      title: string;
      description: string;
    };
  };
};

interface MyContextInterface {
  userInfo?: any;
  setUserInfo?: React.Dispatch<React.SetStateAction<{}>>;
  serchQuery?: string;
  setSerchQuery?: React.Dispatch<React.SetStateAction<string>>;
  serchChannelInfo?: SubscriptionsItem;
  setSerchChannelInfo?: React.Dispatch<
    React.SetStateAction<SubscriptionsItem | undefined>
  >;
  playListInfo?: PlayListItem;
  setPlayListInfo?: React.Dispatch<
    React.SetStateAction<PlayListItem | undefined>
  >;
}

export const MyContext = React.createContext<MyContextInterface>({});

const App: React.FC = () => {
  const [userInfo, setUserInfo] = useState<{ [k: string]: any } | null>(null);
  const [serchQuery, setSerchQuery] = useState('');
  const [serchChannelInfo, setSerchChannelInfo] = useState<SubscriptionsItem>();
  const [playListInfo, setPlayListInfo] = useState<PlayListItem>();

  return (
    <MyContext.Provider
      value={{
        userInfo,
        setUserInfo,
        serchQuery,
        setSerchQuery,
        serchChannelInfo,
        setSerchChannelInfo,
        playListInfo,
        setPlayListInfo,
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
      <BrowserRouter>
        <Suspense fallback="">
          <Page>
            <Header />
            <main className="main">
              <Switch>
                <Route exact path="/" component={Welcome} />
                <Route path="/home" component={Home} />
                <Route path="/search" component={Search} />
                <Route path="/channel" component={Channel} />
                <Route path="/playlist/home" component={PlayListHome} />
                <Route path="/playlist/info" component={PlayListInfo} />
                <Route path="/playlist/item" component={PlayList} />
                <Route path="/single" component={SinglePlayer} />
              </Switch>
            </main>
          </Page>
        </Suspense>
      </BrowserRouter>
    </MyContext.Provider>
  );
};

export default App;
