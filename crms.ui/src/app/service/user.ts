'use client';

import { jwtDecode } from "jwt-decode";
import { dToken, User_Register, UserLogin } from "../dto/user";


export async function loginuser (user:UserLogin) : Promise<any> {
    const request = {
        method :'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(user)
    }
    
    const res = await fetch('http://localhost:2500/api/user', request);

    return await res.json();
}

export async function register(user : User_Register)  {
    const request = {
        method :'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(user)
    }   
    const res = await fetch('http://localhost:2500/api/user/register', request);

    return await res.json();
}

export  function get_role() : string | null {
    let token : string | null = null;
    
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('user');  
    } 
    
    if(token){
        const decoded = jwtDecode<dToken>(token!);
        return decoded.role;
    }
    else{
        return null;
    }   
}

export  function get_id() : string | null {
    const token : string  = localStorage.getItem('user')??"";
    if(token){
        const decoded = jwtDecode<dToken>(token!);
        return decoded.id;
    }
    else{
        return null;
    }   
}

export function get_token() {
    let token : string | null = null;
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('user');
    }

    return token;
}