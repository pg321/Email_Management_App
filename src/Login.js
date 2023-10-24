import React from 'react';
import "./Login.css";
import { Button } from '@mui/material';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { provider } from './firebase';
import { login } from './features/userSlice';
import { useDispatch } from 'react-redux';

function Login() {
    const dispatch = useDispatch();
    const auth = getAuth();
    const signIn = () => {
        signInWithPopup(auth, provider)
        .then(({user}) => {
            dispatch(login({
                displayName: user.displayName,
                email: user.email,
                photoURL : user.photoURL,
            }))
        })
        .catch(error => alert(error.message));
    };

  return (
    <div className="login">
        <div className="login__container">
            <img 
            src="http://1.bp.blogspot.com/-1UXmTyaO4LQ/U2Tg51fVYQI/AAAAAAAACK4/gsBr7C-omlI/s1600/Logo+Gmail.JPG"
            alt="Gmail"
            />
            <Button variant= "contained" color="primary" onClick={signIn} >Login</Button>
        </div>
    </div>
  )
}

export default Login