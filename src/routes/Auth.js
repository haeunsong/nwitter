import React, { useState } from 'react';
import { authService } from '../fbase';

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount,setNewAccount] = useState(true);
  const [error,setError] = useState("");

  const onChange = (e) => {
    const {target: {name,value}}=e;
    if(name==="email"){
      setEmail(value)
    }else if(name==="password"){
      setPassword(value);
    }
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if(newAccount){
        // create account 
        data = await authService.createUserWithEmailAndPassword(email,password);
      }else {
        // log in 
        data = await authService.signInWithEmailAndPassword(email,password);
      }

      console.log(data);
    }catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  

  return (
    <div>

      <form onSubmit={onSubmit}>
        <input
          name="email" 
          type="text" 
          placeholder="Email" 
          required value={email}
          onChange={onChange}
          />
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          required value={password} 
          onChange={onChange}
          />
        <input type="submit" value={newAccount ? "계정 만들기" : "로그인하기"} />
      </form>
      <span onClick={toggleAccount}>{newAccount ? "로그인하기" : "계정 만들기" }</span>
      <div>
        <button>Continue with Google</button>
        <button>Continue with GitHub</button>

        
      </div>
    </div>
  )
}

export default Auth;