import React, { Suspense, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PAGE_URL } from './constants';
import Header from './components/Header';
import './App.css';

const Page = React.lazy(() => import('./pages/Page'));
const Top = React.lazy(() => import('./pages/Top'));
const Home = React.lazy(() => import('./pages/Home'));
const Search = React.lazy(() => import('./pages/Search'));
const VideosSubscriptions = React.lazy(() =>
  import('./pages/Videos/Subscriptions')
);
const VideosSubscriptionsChannelId = React.lazy(() =>
  import('./pages/Videos/Subscriptions/_ChannelId')
);
const PlayListSubscriptions = React.lazy(() =>
  import('./pages/PlayList/Subscriptions')
);
const PlayListSubscriptionsChannelId = React.lazy(() =>
  import('./pages/PlayList/Subscriptions/_ChannelId')
);
const PlayListSubscriptionsChannelIdPlaylistIdPlaylistId = React.lazy(() =>
  import('./pages/PlayList/Subscriptions/_ChannelId/PlaylistId/_PlaylistId')
);

const SinglePlayer = React.lazy(() => import('./pages/SinglePlayer'));

type UserInfo = {
  [k: string]: any;
};

interface MyContextInterface {
  userInfo?: UserInfo;
  setUserInfo?: React.Dispatch<React.SetStateAction<UserInfo>>;
  isGoogleAuthPending?: boolean;
  setIsGoogleAuthPending?: React.Dispatch<React.SetStateAction<boolean>>;
  headerText?: string | null;
  setHeaderText?: React.Dispatch<React.SetStateAction<string | null>>;
}

export const MyContext = React.createContext<MyContextInterface>({});

const App: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({});
  const [isGoogleAuthPending, setIsGoogleAuthPending] = useState(false);
  const [headerText, setHeaderText] = useState<string | null>(null);

  return (
    <MyContext.Provider
      value={{
        userInfo,
        setUserInfo,
        isGoogleAuthPending,
        setIsGoogleAuthPending,
        headerText,
        setHeaderText,
      }}
    >
      <BrowserRouter>
        <Suspense fallback="">
          <Page>
            <Header />
            <main className="main">
              <Switch>
                <Route exact path={PAGE_URL.TOP} component={Top} />
                <Route exact path={PAGE_URL.HOME} component={Home} />
                <Route exact path={PAGE_URL.SEARCH} component={Search} />
                <Route
                  exact
                  path={PAGE_URL.VIDEOS_SUBSCRIPTIONS}
                  component={VideosSubscriptions}
                />
                <Route
                  exact
                  path={PAGE_URL.VIDEOS_SUBSCRIPTIONS + '/:channelId'}
                  component={VideosSubscriptionsChannelId}
                />
                <Route
                  exact
                  path={PAGE_URL.PLAYLIST_SUBSCRIPTIONS}
                  component={PlayListSubscriptions}
                />
                <Route
                  exact
                  path={PAGE_URL.PLAYLIST_SUBSCRIPTIONS + '/:channelId'}
                  component={PlayListSubscriptionsChannelId}
                />
                <Route
                  exact
                  path={
                    PAGE_URL.PLAYLIST_SUBSCRIPTIONS +
                    '/:channelId/playlistid/:playListId'
                  }
                  component={PlayListSubscriptionsChannelIdPlaylistIdPlaylistId}
                />
                <Route
                  exact
                  path={PAGE_URL.SINGLE + '/:videoId'}
                  component={SinglePlayer}
                />
                <Route path="*" component={() => <>404 NOT FOUND</>} />
              </Switch>
            </main>
          </Page>
        </Suspense>
      </BrowserRouter>
    </MyContext.Provider>
  );
};

export default App;
