import React, { useCallback, useContext } from 'react';
import firebase from 'firebase/app';
import googleSiginInImage from '../../assets/btn_google_signin.png';
import 'firebase/auth';
import { MyContext } from '../../App';
import { RouteComponentProps } from 'react-router-dom';

interface ChildComponentProps extends RouteComponentProps<any> {}

const SignIn: React.FC<ChildComponentProps> = ({
  history,
}: ChildComponentProps) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  const { setIsSignIn } = useContext(MyContext);
  const handleClick = useCallback(() => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result: any) => {
        const token = result.credential.accessToken;
        const user = result.user;
        console.log(token);
        console.log(user);
        setIsSignIn(true);
        history.push('/');
      })
      .catch(({ code, message }) => {
        console.error(code, message);
      });
  }, [provider]);

  return (
    <div onClick={handleClick}>
      <img src={googleSiginInImage} alt="google sigin in button" />
    </div>
  );
};

export default SignIn;
