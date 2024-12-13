'use client'

import { Box, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { register } from "@/app/service/user";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User_Register } from "@/app/dto/user";

export default function Register() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const router = useRouter();
  const saveUser = async () =>{
    const user : User_Register = {
      id : id,
      name : name,
      contact : contact,
      password : password,
      username : username,
      role : '',
    }

    const res = await register(user);
    console.log(typeof res.successed, res.nid_exist, res.contact_exist, res.username_exist);
    
    if(res.successed){
      alert("Register Successed");
      
      router.replace('/user/login');
    }
    else{
      if (res.nid_exist ==true) {
        
        alert("NID exist");
      }
      if (res.contact_exist) {
        alert("Contact exist");
      }
      if(res.username_exist){
        alert("Username exist");
      }

    }
  }
  return (
    <div className="top-border"> 
        <form action="/register" method="post"> 
          <h2>Sign up</h2>
          <Box>
            <TextField variant="filled" className="input" label="Name" value={name} onChange={(e) => {setName(e.target.value)}}></TextField>
            <TextField variant="filled" className="input" label="Username" value={username} onChange={(e) => {setUsername(e.target.value)}}></TextField>
            <TextField variant="filled" className="input" label="NID" value={id} onChange={(e) => {setId(e.target.value)}}></TextField>
            <TextField variant="filled" className="input" label="Contact" value={contact} onChange={(e) => {setContact(e.target.value)}}></TextField>
            <TextField variant="filled" className="input" type="password" label="Password" value={password} onChange={(e) => {setPassword(e.target.value)}}></TextField>
            <Button onClick={() => {saveUser()}} variant='contained' className='submit'>Register</Button>
          </Box>
      </form>
    </div>
  );
}