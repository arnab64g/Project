'use client'

import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { Officer, Officer_Dto } from "../dto/officer_dto";
import { addEditOfficer, getOfficer } from "../service/officer";

export default function Officer_View() {
    let officers : Officer[] = [];
    const [nid , setNid] = useState('');
    const [rank, setRank] = useState('');
    const [officer, setOfficer] = useState(officers);
    
    useEffect(()=>{fetchOfficer()}, []);

    const edit = (id : string, rank0:string) =>{
        setNid(id);
        setRank(rank0);
    }

    const clear = () => {
        setNid('');
        setRank('');
    }

    const fetchOfficer = async ()=>{
        officers = await getOfficer();
        console.log(officers);
        
        setOfficer(officers);
    }

    const save = async () => {
        const officer : Officer_Dto = {
            id : nid,
            rank : rank
        }

        const res = await addEditOfficer(officer);
        if(res){
            fetchOfficer();
        }
    }

    return(<Box className="top-border horizontal">
        <Box>
        <form > 
            <h2>Add or Edit Officer</h2>
            <TextField variant="filled" required className='input' label="NID" value={nid} onChange={(e) => {setNid(e.target.value)}}> </TextField>
            <TextField variant="filled" required className='input' label="Rank" value={rank} onChange={(e) => {setRank(e.target.value)}}></TextField>
            <Button className="submit" onClick={() => {clear()}} variant="outlined">Clear</Button>
            <Button className='submit' onClick={()=>{save()}} variant='contained'>Save</Button>
        </form> 
        </Box>
        
        <Box className="table-view">
            <Box className="horizontal">
            <h2>List of Officers</h2>
        </Box>
        <TableContainer>
            <Table sx={{minWidth:600}}>
                <TableHead>
                    <TableRow>
                        <TableCell className="t-head">NID</TableCell>
                        <TableCell className="t-head">Name</TableCell>
                        <TableCell className="t-head">Rank</TableCell>
                        <TableCell className="t-head"></TableCell>
                    </TableRow>
            </TableHead>
            <TableBody>
                {
                    officer.map((x) => (<TableRow key={x.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>{x.id}</TableCell>
                        <TableCell>{x.user.name}</TableCell>
                        <TableCell>{x.rank}</TableCell>
                        <TableCell>
                            <Button onClick={() => {edit(x.id, x.rank)}}>Edit</Button>
                        </TableCell>
                </TableRow>))
                }
            </TableBody>
            </Table>
        </TableContainer>
        </Box>
    </Box>)
}