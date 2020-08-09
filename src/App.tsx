import React, { useState } from 'react';
import Header from './components/Header';
import Top from './pages/Top';
import SignIn from './pages/SignIn';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

export const MyContext = React.createContext({ isSignIn: false });

const App: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  return (
    <MyContext.Provider value={{ ...{ isSignIn, setIsSignIn } }}>
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
