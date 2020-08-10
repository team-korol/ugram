import React, { useCallback, useContext } from 'react';
import firebase from 'firebase/app';
import googleSiginInImage from '../../assets/btn_google_signin.png';
import 'firebase/auth';
import { MyContext } from '../../App';
import { RouteComponentProps } from 'react-router-dom';
import { Helmet } from 'react-helmet';

interface ChildComponentProps extends RouteComponentProps<any> {}

const SignIn: React.FC<ChildComponentProps> = ({
  history,
}: ChildComponentProps) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  provider.addScope('https://www.googleapis.com/auth/youtube');
  provider.addScope('https://www.googleapis.com/auth/youtube.force-ssl');
  provider.addScope('https://www.googleapis.com/auth/youtube.readonly');
  const { setIsSignIn } = useContext(MyContext);
  const handleClick = useCallback(() => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result: any) => {
        const token = result.credential.accessToken;
        //TODO: テスト確認次第消す
        //@see https://developers.google.com/youtube/v3/guides/auth/client-side-web-apps?hl=ja
        fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`)
        .then(response => response.json())
        .then(data => {
          console.log('test結果',data)
        });
        setIsSignIn(true);
        history.push('/');
      })
      .catch(({ code, message }) => {
        console.error(code, message);
      });
  }, [provider, history, setIsSignIn]);

  return (
    <>
      <Helmet title="Sign in | Ugram" />
      <div onClick={handleClick}>
        <img src={googleSiginInImage} alt="google sigin in button" />
      </div>
    </>
  );
};

export default SignIn;
