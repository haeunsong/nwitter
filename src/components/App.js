import React,{useState} from 'react';
import AppRouter from "components/Router";
import {authService} from "fbase";
import { auth } from 'firebaseui';

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  return (
    <div>
      <AppRouter isLoggedIn={isLoggedIn} />;
      <footer>&copy; {new Date().getFullYear()}Nwitter</footer>
      
    </div>
  );
};

export default App;