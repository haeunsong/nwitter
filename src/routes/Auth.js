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
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />

      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with GitHub</button>

        {alert(error)}
      </div>
    </div>
  )
}

export default Auth;