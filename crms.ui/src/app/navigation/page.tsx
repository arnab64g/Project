'use client';

import { AppBar, Button, Toolbar } from "@mui/material";
import Link from "next/link";
import { get_role } from "../service/user";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const role : string | null =  get_role();
  const router = useRouter();
  
  const isLoggedIn : boolean  = role === null ? false : true;


  if (isLoggedIn) {
    switch (role) {
      case "Admin":
        return(
          <AppBar color="primary">
          <Toolbar>
            {
              <div>
                <span>Criminal Record Management System</span>
              <Link className="nav-btn" href='/officer_list'>Officer</Link>
              <Button color="secondary"  className="nav-log-btn" variant="outlined" onClick={() => {localStorage.removeItem('user'); router.replace('/user/login'); router.refresh(); }}>Logout</Button>
            
            </div> 
            }
          </Toolbar>
        </AppBar>
        )
    case "Officer":
      return(
        <AppBar color="primary">
        <Toolbar>
        {
            <div>
              <span>Criminal Record Management System</span>
            <Link className="nav-btn" href='/fir'>FIR</Link>
            <Link className="nav-btn" href='/accused'>Accused</Link>
            
            <Button color="secondary" className="nav-log-btn" variant="outlined" onClick={() => {localStorage.removeItem('user'); router.replace('/user/login'); router.refresh(); }}>Logout</Button>
          </div> 
          }
        </Toolbar>
      </AppBar>
      )
      default:
        return(
          <AppBar className="nav" color="primary">
          <Toolbar className="nav">
            {
              <div >
                <span>Criminal Record Management System</span>
              <Link color="secondary" className="nav-btn" href='/my_fir'>My FIR</Link>
            
              <Button color="error"  className="nav-log-btn" variant="contained" onClick={() => {localStorage.removeItem('user'); router.replace('/user/login'); router.refresh(); }}>Logout</Button>
            </div> 
            }
          </Toolbar>
          
        </AppBar>
        )
    }
    
  }
  else {
    return(
      <AppBar color="primary">
  <Toolbar>
  <span>Criminal Record Management System</span>
            {
              <div className="user">
                <Link className="nav-btn"  href="/user/login">Login</Link>
                <Link className="nav-btn" href='/user/register'>Register</Link>  
              </div>
            }
          </Toolbar>
        </AppBar>
    )
    
  }
}