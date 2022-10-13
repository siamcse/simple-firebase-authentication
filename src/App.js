import './App.css';
import {getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth';
import app from './firebase/firebase.init';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSign=()=>{
    signInWithPopup(auth,googleProvider)
      .then(result=>{
        const user= result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error=>{
        console.error(error);
      })
  }
  const handleSignOut=()=>{
    signOut(auth)
    .then(()=>{
      setUser({});
    })
    .catch(()=>{
      setUser({});
    })
  }
  const handleGithubSign=()=>{
    signInWithPopup(auth,githubProvider)
      .then(result=>{
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error=>{
        console.error(error);
      })
  }
  return (
    <div className="App">
      {
        !user.uid ?
        <>
          <button onClick={handleGoogleSign}>Google Sign In</button>
        <button onClick={handleGithubSign}>Github Sign In</button>
        </>
        :
      <button onClick={handleSignOut}>Sign Out</button>
      }
      {
        user.uid && 
        <div>
          <h3>Name: {user.displayName}</h3>
      <p>Email: {user.email}</p>
      <img src={user.photoURL} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
