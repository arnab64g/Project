'use client'

import { Officer_Dto } from "../dto/officer_dto";
import { get_token } from "./user";

export async function addEditOfficer(officer : Officer_Dto) {
    const request = {
        method :'POST',
        headers : {
            'Content-Type' : 'application/json',
            'authorization' : `bearer ${get_token()}`
        },
        body : JSON.stringify(officer)
    }
    
    const res = await fetch('http://localhost:2500/api/officer', request);

    return await res.json();
}

export async function getOfficer() {
    const request = {
        method :'GET',
        headers : {
            'Content-Type' : 'application/json',
            'authorization' : `bearer ${get_token()}`
        }
    }
    
    console.log(request);
    const res = await fetch('http://localhost:2500/api/officer', request);

    return await res.json();
}
