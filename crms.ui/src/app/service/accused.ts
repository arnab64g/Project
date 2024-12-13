'use client'

import { Accused_Dto } from "../dto/accused_dto";
import { get_token } from "./user";

export async function addEditAccused(accused : Accused_Dto) {
    console.log(accused);
    
    const request = {
        method :'POST',
        headers : {
            'Content-Type' : 'application/json',
            'authorization' : `bearer ${get_token()}`
        },
        body : JSON.stringify(accused)
    }
    
    const res = await fetch('http://localhost:2500/api/accused', request);

    return await res.json();
}

export async function getAccusedService() : Promise<Accused_Dto[]> {
    
    const request = {
        method :'GET',
        headers : {
            'Content-Type' : 'application/json',
            'authorization' : `bearer ${get_token()}`
        },
    }
    
    const res = await fetch('http://localhost:2500/api/accused', request);

    return await res.json();
}


