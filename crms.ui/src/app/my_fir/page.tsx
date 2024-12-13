'use client'

import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { Fir_Dto } from "../dto/fir_dto";
import { get_id } from "../service/user";
import { addFir, getFirAccused, getMyFir } from "../service/fir";
import { Case_Dto } from "../dto/case_dto";
import { getCaseService } from "../service/case";
import { Accused_Dto } from "../dto/accused_dto";
import InfoIcon from '@mui/icons-material/Info';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo/DemoContainer";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker/DateTimePicker";
import dayjs from "dayjs";

export default function My_Fir() {
    let fir : Fir_Dto[] = [];
    let a : Accused_Dto[] = [];
    let c1 : Case_Dto = {id : 0, case_status : "", section_of_law : "", investigation : ""};
    const [place, setPlace] = useState("");
    const [details, seTableCelletails] = useState("");
    const [accused, setAccused] = useState('');
    const [firs, setFirs] = useState(fir);
    const [case1, setCase] = useState(c1);
    const [list, setList] = useState(a);
    const [datet, setDateT] = useState(new Date());

    useEffect(()=>{fetchMyFir()}, []);

    const fetchMyFir = async () =>{
        const res = await getMyFir();
        setFirs(res);
        console.log(res);
    }

    const getCase = async(id : number) =>{
        const res = await getCaseService(id)
        setCase(res)
        const al = await getFirAccused(id);
        setList(al);
        
    }

    const save = async () => {
        let fir : Fir_Dto = {
            id : 0,
            inscident_date : datet,
            date_lodged : new Date(),
            place : place,
            pretitioner_id : get_id()!,
            details : details,
            acused_name : accused
        }
        console.log(fir);
        
        const res = await addFir(fir);
        if (res) {
            alert("Added");
            fetchMyFir();
        }
    }
    
    return(<div className="top-border horizontal">
        <div>
        <form > 
            <h2>Add or Edit FIR</h2>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']}>
                    <DateTimePicker label="Basic date time picker" onChange={(e) => { setDateT(new Date(dayjs(e).toISOString())); console.log(datet);
                    }} value={dayjs(datet)}/>
                </DemoContainer>
            </LocalizationProvider>
            <TextField variant="filled" required value={place} onChange={(e) => {setPlace(e.target.value)}} className='input' label="Place"></TextField>
            <TextField variant="filled" required value={details} onChange={(e) => {seTableCelletails(e.target.value)}} className='input' label='Case Details' multiline minRows={3}></TextField>
            <TextField variant="filled" value={accused} onChange={(e) => {setAccused(e.target.value)}} label="Accused(Optional)" className='input'></TextField>
            <Button className='submit' onClick={() => {save()}} variant='contained'>Save</Button>
        </form> 
        </div >
        <div className="table-view">
            <div className="horizontal">
            <h2>List of FIR</h2>
        </div>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className="t-head">FIR ID</TableCell>
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
                firs.map((x) => (
                    <TableRow key={x.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>{x.id} </TableCell>
                        <TableCell> {String(x.date_lodged.toLocaleString().split('T')[0])} </TableCell>
                        <TableCell>{String(x.inscident_date.toString()).split('T')[0]}</TableCell>
                        <TableCell>{x.place}</TableCell>
                        <TableCell> {String(x.inscident_date.toLocaleString()).split('T')[1].split('.')[0]} </TableCell>
                        <TableCell>{x.details}</TableCell>
                        <TableCell><IconButton onClick={() => {getCase(x.id)}}><InfoIcon color="primary"></InfoIcon></IconButton></TableCell>
                    </TableRow>       
                ))
            }
                </TableBody>
            </Table>
        </TableContainer>
        </div>
        <div className="table-view">
            <h1>Case Description</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableRow>
                        <TableCell>Case Status</TableCell>
                        <TableCell>{case1.case_status}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Section of Law</TableCell>
                        <TableCell>{case1.section_of_law}</TableCell>
                    </TableRow>
                </Table>
            </TableContainer>
            <h2>Accused List</h2>
            <table>
                <tbody>
                {
                    list.map((x) => (<tr key={x.id}>
                        <TableCell>{x.name}</TableCell>
                        <TableCell>{x.status}</TableCell>
                    </tr>))
                }
                </tbody>
                
            </table>
        </div>
    </div>)
}