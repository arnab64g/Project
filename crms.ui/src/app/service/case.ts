'use client'

import { Case_Dto } from "../dto/case_dto";
import { get_id, get_token } from "./user";

export async function getCaseService(id : number)  {
    const request = {
        method :'GET',
        headers : {
            'Content-Type' : 'application/json',
            'authorization' : `bearer ${get_token()}`
        }
    }
    
    const res = await fetch(`http://localhost:2500/api/case?id=${id}`, request);

    return await res.json();
}

export async function updateCase(case1 : Case_Dto) {
    console.log(case1);
    case1.investigation = get_id()??"";
    
    const request = {
        method :'PUT',
        headers : {
            'Content-Type' : 'application/json',
            'authorization' : `bearer ${get_token()}`
        },
        body : JSON.stringify(case1)
    }
    
    const res = await fetch('http://localhost:2500/api/case', request);
    console.log(res);
    
    return await res.json();
}