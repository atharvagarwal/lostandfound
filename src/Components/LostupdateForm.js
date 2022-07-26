import { useState, createContext, useContext } from "react";
import './Form.css'
import { UserContext} from "../UserContext"
import userAuthContext from "../UserContext"
import {useNavigate} from 'react-router-dom'
import {useParams} from 'react-router-dom';

export default function Register(){
 const params = useParams();


  const nav = useNavigate();
    const [contact,setContact]= useState()
    const [email,setEmail]= useState("")
    const [name,setName]= useState()
    const [imgUrl,setUrl]=useState()
    const[description,setDescription]= useState("");
    
    const[fail,setFail]= useState("")
    const {auth,userState,user} = useContext(userAuthContext);
    const formSubmit=(e)=>{
      
      e.preventDefault();
      
      console.log(email);
      fetchLogin();}
    let myWidget = window.cloudinary.createUploadWidget({
        cloudName: 'projectcloudat7', 
        uploadPreset: 'at7_upload_preset'}, (error, result) => { 
          if (!error && result && result.event === "success") { 
            
            setUrl(result.info.url)
            
          }
        }
      )

      const fetchLogin=()=>{
        
        fetch(`http://localhost:5000/items/lostItems/${params.id}`, {
        method: 'PUT',
       
        body: JSON.stringify({userEmail:user.email, contact:contact,itemName:name,lostitemUrl:imgUrl,description:description}),
        headers: {
          'Accept': "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,

        },
      })
      .then((rawResponse)=> {return rawResponse.json()}).then((response)=>{if(response.success){setFail("Updated");}else{setFail("Update Request Failed")}})
    }

    return(
      <div>
            <div className="tag">
            <a href="/" >
              Home
            </a>
            <a href='/dashboard'>Dashboard</a>
      </div>
        <div className="container mt-5">
        <h1 className='Header-1'>Update Item</h1>
      
      
      <div className='main-divv'>
          <div className="col-sm-6 sec-div">
            <div className="card card-div">
              <div className="card-body">
                <form action="/register" onSubmit={(e)=>formSubmit(e)}>
                <div className="form-group">
                <label htmlFor="email">Name</label>
                <input type="text" className="form-control" name="name" placeholder="Name" onChange={(e)=>setName(e.target.value)}  />
                  </div>
                  <div className="form-group">
                  <label htmlFor="email">Email</label>
                <input type="email" className="form-control" name="email" placeholder={user.email} disabled/>
                  </div>
                  
                  
                  <div className="form-group">
                    <label htmlFor="contact">Contact</label>
                    <input type="text" className="form-control" name="contact" placeholder="Contact" onChange={(e)=>{setContact(e.target.value)}} />
                  </div>
                 
                  <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Description</label>
                    
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" maxLength="150" onChange={(e)=>{setDescription(e.target.value)}} />
                    
                  </div>
                  <h5 style={{"color": "white"}}>In order to update properly re-write all the fields</h5>
                  
                  
                 <button type="submit" className="btn btn-dark sub-btn">Update</button>
                 
            </form>
            <button className="btn btn-dark" style={{"marginBottom":"0.25rem"}} onClick={()=>{myWidget.open()}} >Upload Image</button>
                <h5 style={{"color": "white"}}>{fail}</h5>
                 </div>
            </div>
          </div>
      
          </div>
        </div>
        </div>
          
          
    )}
