import React, { useEffect, useState } from 'react';
import AppRouter from "components/Router";
import { authService } from "fbase";
import { auth } from 'firebaseui';

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // firebase가 정보를 다 업데이트해서 authService.currentUser가 null값이 아닌 
  // 사용자 정보가 들어있을 때까지 기다려준다. 
  useEffect(() => {
    // 이벤트를 listen 해야함.
    // onAuthStateChanged (관찰자)
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });

  }, [])
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."};
      <footer>&copy; {new Date().getFullYear()}Nwitter</footer>

    </>
  );
};

export default App;