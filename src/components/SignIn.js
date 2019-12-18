import React from 'react';
import { auth, signInWithGoogle } from '../firebase/firebase.utils';

const SignIn = ({user}) => {

    return (
        <li>
            {!user ? <a onClick={signInWithGoogle} href="#">
                Sign In
            </a>: <a onClick={()=>auth.signOut()} href="#">
                Sign Out    
            </a>}
        </li>
    )
}

export default SignIn;