'use client'

import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { Accused_Dto } from "../dto/accused_dto";
import { addEditAccused, getAccusedService } from "../service/accused";

export default function Accused() {
    const accuseds : Accused_Dto[] = [];
    const [name, setName] = useState('');
    const [gender, setGender] = useState(0);
    const [age, setAge] = useState(0);
    const [status, setStatus] = useState(''); 
    const [accused, setAccused] = useState(accuseds);
    const [id, setId] = useState(0);

    useEffect(() => {fetchAccused()}, []);
    
    const saveAccused = async () =>{
        let accused :Accused_Dto = {
            id : id,
            gender : gender??0,
            name : name,
            age : age,
            status : status
        }

        const res = await addEditAccused(accused);
        if (res) {
            alert("Accused updated");
            fetchAccused();
        }
    }

    const fetchAccused = async() => {
        const res = await getAccusedService();
        setAccused(res);
    } 

    const edit = async(accused : Accused_Dto) => {
        setId(accused.id)
        setName(accused.name);
        setAge(accused.age);
        setGender(accused.gender);
        setStatus(accused.status);
    }

    return(<div className="top-border horizontal">
        <Box>
        <form > 
            <h2>Add or Edit Accused</h2>
            <TextField variant="filled" required className='input' value={name} onChange={(e) => {setName(e.target.value)}} label="Accused Name"></TextField>
            <FormControl variant="filled" className="input">
                <InputLabel>Gender</InputLabel>
                <Select required  value={gender} onChange={(e) => {setGender(Number(e.target.value))}} label="Gender">
                <MenuItem disabled value={0}>Select Gender</MenuItem>
                <MenuItem value={1}>Male</MenuItem>
                <MenuItem value={2}>Female</MenuItem>
            </Select>
            </FormControl>
            <TextField variant="filled" required className='input' type="number" value={age} onChange={(e) => {setAge(Number(e.target.value))}} label="Age"></TextField>
            <TextField variant="filled" required className='input' value={status} onChange={(e) => {setStatus(e.target.value)}} label="Status"></TextField>
            <Button variant="outlined"  className="submit" onClick={() => {edit({age : 0, gender : 0, name : '', status : '', id : 0})}}>Clear</Button>
            <Button className='submit' onClick={() => {saveAccused()}} variant='contained'>Save</Button>
        </form> 
        </Box >
        <div className="table-view">
            <div className="horizontal">
            <h2>List of Accused</h2>
        </div>
        <TableContainer component={Paper}>
        <Table aria-label="simple-table" sx={{minWidth:700}}>
            <TableHead >
            <TableRow >
                <TableCell className="t-head">Accused name</TableCell>
                <TableCell className="t-head">Age</TableCell>
                <TableCell className="t-head">Gender</TableCell>
                <TableCell className="t-head">Status</TableCell>
                <TableCell className="t-head"></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {
                accused.map((x) => (<TableRow key={x.id} sx={{'&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{x.name}</TableCell>
                    <TableCell>{x.age}</TableCell>
                    <TableCell>{x.gender == 1 ? 'Male' : 'Female'}</TableCell>
                    <TableCell>{x.status}</TableCell>
                    <TableCell><Button onClick={() => {edit(x)}}>Edit</Button></TableCell>
                </TableRow>))
            }        
            </TableBody>
        </Table>
        </TableContainer>  
        </div>
    </div>)
}