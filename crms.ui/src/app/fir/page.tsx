'use client'

import { Button, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { Fir_Accused, Fir_Dto } from "../dto/fir_dto";
import { getFir, getFirAccused, removeFir_Accused, updateFir_Accused, updateFirService } from "../service/fir";
import { getCaseService, updateCase } from "../service/case";
import { Case_Dto } from "../dto/case_dto";
import { Accused_Dto } from "../dto/accused_dto";
import { getAccusedService } from "../service/accused";
import InfoIcon from '@mui/icons-material/Info';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function Fir() {
    let firs : Fir_Dto[] = [];
    let accused : Accused_Dto[] = [];
    let firAccused : Accused_Dto[] = [];
    let l : Accused_Dto[] = [];
    let a : Accused_Dto[] = [];
    const [id, setId] = useState(0);
    const [status, setStatus] = useState('');
    const [sol, setSol] = useState('');
    const [accuseds, setAccuseds] = useState(accused);
    const [list, setList] = useState(firAccused);
    const [firId, setFirrId] = useState(0);
    
    
    const [fir, setFirs] = useState(firs);
    useEffect(() => { fetchFir() }, []);

    const fetchFir = async() => {
        let res = await getFir();
        console.log(res);
        setFirs(res);
    }

    const edit = async(id : number) => {
        let res : Case_Dto = await getCaseService(id);
        setFirrId(id);
        setId(res.id);
        setSol(res.section_of_law);
        setStatus(res.case_status);
        a = await getAccusedService();
        l = await getFirAccused(id);
        l.forEach(element => {
            a = a.filter(x => x.id != element.id)
        });
        setList(l);
        setAccuseds(a);   
    }

    const save = async() => {
        const c : Case_Dto = {
            id : id,
            case_status : status,
            section_of_law : sol,
            investigation : '',
        }
        
        const res = await updateCase(c);
    
        if(res) {
            alert('Updated')
        }
    }

  const removeAccused =  async(accused_id : number) => {
    const fir_accused : Fir_Accused = {
        firId : firId,
        accusedId : accused_id
    }

    const res = await removeFir_Accused(fir_accused);
    if (res) {
        edit(firId);
    }
  }

    const addAccused = async (accused_id : number) =>{
        const fir_accused : Fir_Accused = {
            firId : firId,
            accusedId : accused_id
        }
        const res = await updateFir_Accused(fir_accused);
        if (res) {
            edit(firId)
        }
        
    }
    
    return(<div className="top-border horizontal">
        <div>
        <form > 
            <h2>Add or Edit Case</h2>
            <TextField variant="filled" required className='input' value={status} onChange={(e) => {setStatus(e.target.value)}} label="Case Status"></TextField>
            <TextField variant="filled" required className='input' value={sol} onChange={(e) => {setSol(e.target.value)}} label='Section of Law'></TextField>
            <Button className='submit' onClick={()=>{save();}} variant='contained'>Save</Button>
        </form> 
        </div>
        <div className="table-view">
            <div className="horizontal">
            <h2>List of FIR</h2>
        </div>
        <TableContainer component={Paper}>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell className="t-head">Fir ID</TableCell>
                <TableCell className="t-head">Date Lodged</TableCell>
                <TableCell className="t-head">Incident Date</TableCell>
                <TableCell className="t-head">Incident Place</TableCell>
                <TableCell className="t-head">Incident Time</TableCell>
                <TableCell className="t-head">Details</TableCell>
                <TableCell className="t-head"></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {
                fir.map((x) => (<TableRow key={x.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{x.id}</TableCell>
                    <TableCell>{String(x.date_lodged).split('T')[0] }</TableCell>
                    <TableCell>{String(x.inscident_date).split('T')[0]}</TableCell>
                    <TableCell>{x.place}</TableCell>
                    <TableCell>{String(x.inscident_date).split('T')[1].split('.')[0]}</TableCell>
                    <TableCell>{x.details}</TableCell>
                    <TableCell>
                        <IconButton onClick={()=>{edit(x.id)}}> <ModeEditIcon color="primary"></ModeEditIcon> </IconButton>
                        <IconButton onClick={()=>{edit(x.id)}}> <InfoIcon color="primary"></InfoIcon> </IconButton>
                    </TableCell>
                    
                </TableRow>))
            }
            </TableBody>
        </Table>
        </TableContainer>
        </div>
        {
            (firId != 0) ?  <div className="table-view">
                <div>
        <h1>Case Description</h1>
        <TableContainer>
            <TableBody>
                <TableRow>
                    <TableCell> Case Statue </TableCell>
                    <TableCell> {status} </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell> Section of Law </TableCell>
                    <TableCell> {sol} </TableCell>
                </TableRow>
            </TableBody>
        </TableContainer>
        </div>
            <div>
                <h1>Accused</h1>
                <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                    {
                        list.map((x) => (<TableRow key={x.id}>
                            <TableCell>{x.name}</TableCell>
                            <TableCell><IconButton color='warning' onClick={() => {removeAccused(x.id)}}> <RemoveCircleIcon></RemoveCircleIcon> </IconButton></TableCell>
                        </TableRow>))
                    }
                    </TableBody>
                    
                </Table>
                </TableContainer>
                
            </div>
            <div>
                <h1>Add accused</h1>
                <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                    {
                        accuseds.map((x) => (<TableRow key={x.id}>
                            <TableCell>{x.name}</TableCell>
                            <TableCell><IconButton onClick={() => {addAccused(x.id)}}> <AddCircleOutlineIcon color="primary" ></AddCircleOutlineIcon> </IconButton></TableCell>
                        </TableRow>))
                    }
                    </TableBody>
                </Table>    
                </TableContainer>
                
            </div>
        </div> : null
        }
       
    </div>)
}