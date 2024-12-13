'use client'

import { Accused_Dto } from "../dto/accused_dto";
import { Fir_Accused, Fir_Dto } from "../dto/fir_dto";
import { get_id, get_token } from "./user";

export async function addFir(fir : Fir_Dto) {
    const request = {
        method :'POST',
        headers : {
            'Content-Type' : 'application/json',
            'authorization' : `bearer ${get_token()}`
        },
        body : JSON.stringify(fir)
    }
    
    const res = await fetch('http://localhost:2500/api/fir', request);

    return await res.json();
}

export async function updateFirService(fir : Fir_Dto) {
    const request = {
        method :'PUT',
        headers : {
            'Content-Type' : 'application/json',
            'authorization' : `bearer ${get_token()}`
        },
        body : JSON.stringify(fir)
    }
    
    const res = await fetch('http://localhost:2500/api/fir', request);

    return await res.json();
}

export async function updateFir_Accused(fir_accused : Fir_Accused) {
    const request = {
        method :'PUT',
        headers : {
            'Content-Type' : 'application/json',
            'authorization' : `bearer ${get_token()}`
        },
        body : JSON.stringify(fir_accused)
    }
    
    const res = await fetch('http://localhost:2500/api/fir', request);

    return await res.json();
}

export async function removeFir_Accused(fir_accused : Fir_Accused) {
    const request = {
        method :'PUT',
        headers : {
            'Content-Type' : 'application/json',
            'authorization' : `bearer ${get_token()}`
        },
        body : JSON.stringify(fir_accused)
    }
    
    const res = await fetch('http://localhost:2500/api/fir/delete', request);

    return await res.json();
}

export async function getMyFir() {
    const request = {
        method :'GET',
        headers : {
            'Content-Type' : 'application/json',
            'authorization' : `bearer ${get_token()}`
        }
    }
    
    const res = await fetch(`http://localhost:2500/api/fir/${get_id()}`, request);

    return await res.json();
}

export async function getFir() {
    const request = {
        method :'GET',
        headers : {
            'Content-Type' : 'application/json',
            'authorization' : `bearer ${get_token()}`
        }
    }
    
    const res = await fetch(`http://localhost:2500/api/fir/officer/${get_id()}`, request);

    return await res.json();
}

export async function getFirAccused(id  : number) : Promise<Accused_Dto[]> {
    const request = {
        method :'GET',
        headers : {
            'Content-Type' : 'application/json',
            'authorization' : `bearer ${get_token()}`
        }
    }
    
    const res = await fetch(`http://localhost:2500/api/fir/accused/${id}`, request);

    return await res.json();
}