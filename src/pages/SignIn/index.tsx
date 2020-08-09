import React, { useCallback } from 'react';
import firebase from "firebase/app";
import googleSiginInImage from "../../assets/btn_google_signin.png";
import "firebase/auth";

const SignIn: React.FC = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  const handleClick = useCallback(()=>{
    firebase.auth().signInWithPopup(provider).then((result:any) => {
      const token = result.credential.accessToken;
      const user = result.user;
      console.log(token);
      console.log(user);
    }).catch(({code, message}) => {
      console.error(code,message);
    });
  },[provider]);

  return (
  <div onClick={handleClick}>
    <img src={googleSiginInImage} alt="google sigin in button" />
  </div>);
};

export default SignIn;
