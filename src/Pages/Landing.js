import React from 'react'
import Navbar from '../Components/Navbar'
import './Landing.css'
import AuthContext from "../UserContext"
import { useState, createContext, useContext,useEffect}  from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
const Landing = () => {

  

  return (
    <>
    
    <Navbar></Navbar>
    <div className="main-div">
    <h1 className="head-1">Lost An Item </h1>
    <h3 className="head-3">Do Not Worry As We Will Help You Find It</h3>
    <div>
     
     
      </div>
      <img className="main-img" src="svg1.svg" alt="Image of people giving lost items"></img>
      <p className="normal-p" style={{margin:"20px"}}>Note-The platform intends to help people to post about lost and found items. Thus, it is requested that the users respect and co-operate with other users. Moreover, the platform does not take any responsibility for the communication and disputes among two users.
      </p>

    
      


     
    </div>
    </>
  )
}

export default Landing