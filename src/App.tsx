import React, { useState } from 'react';
import Header from './components/Header';
import Top from './pages/Top';
import SignIn from './pages/SignIn';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { Helmet } from 'react-helmet';

interface MyContextInterface {
  isSignIn?: boolean;
  setIsSignIn?: any;
}

export const MyContext = React.createContext<MyContextInterface>({});

const App: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  return (
    <MyContext.Provider value={{ isSignIn, setIsSignIn }}>
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
            content: `${process.env.PUBLIC_URL}/Ugram_logo_full.png`,
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
      <Router>
        <Header />
        <main className="main">
          <Route exact path="/" component={Top} />
          <Route path="/sign-in" component={SignIn} />
        </main>
      </Router>
    </MyContext.Provider>
  );
};

export default App;
