"use client"

import { UserLogin } from '@/app/dto/user';
import {loginuser, register} from '@/app/service/user';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()
  const login = async () =>{
    const user : UserLogin = {
      username : username,
      password : password,
    }

    const res = await loginuser(user);
    console.log(res);
    if(res.successed){
      alert("Log in successfully")
      localStorage.setItem('user', res.token);
      router.replace('/');
      router.refresh();
    }
    else{
      alert(res.message);
    }
  }

  return (
    <div className='top-border'> 
        <form> 
            <h2>Sign in</h2>
            <TextField className='input' id="username" label="Username" value={username} variant="filled" onChange={(e) => {setUsername(e.target.value)}} />
            <TextField className='input' id="password" label="Password" value={password} type='password' variant="filled" onChange={(e) => {setPassword(e.target.value)}}/>
            <Button onClick={() => {login()}} variant='contained' className='submit'>Login</Button>
        </form>
      </div>
  );
}
