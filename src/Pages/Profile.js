import { useState, createContext, useContext,useEffect } from "react";
import './FetchPage.css'

import userAuthContext from "../UserContext"



const Profile = () => {
    const {auth,userState,user} = useContext(userAuthContext);
    const [profileItems,setProfileItems] =useState();
    const [profileItemss,setProfileItemss] =useState();
    
    const [copyProfileItems,setcopyProfileItems] =useState();
    const [copyProfileItemss,setcopyProfileItemss] =useState();

    const [itemShow,setItemShow] = useState(false);
    const [itemShows,setItemShows] = useState(false);
    
    const [deleted,isDeleted] = useState(false);

    useEffect(()=>{
       const fetchData= async()=>{
            const data=await fetch('http://localhost:5000/items/lostItems',{
             method: 'GET',
             credentials:'include',
             headers: {
                'Accept': "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true}
            })
            const fetchData=await data.json();
            
            await setProfileItems(fetchData.item[0]);
            await setcopyProfileItems(fetchData.item[0])
            await setItemShow(true)

            
        }
        const fetchDataa= async()=>{
            const dataa=await fetch('http://localhost:5000/history/foundItems',{
             method: 'GET',
             credentials:'include',
             headers: {
                'Accept': "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true}
            })
            const fetchDataa=await dataa.json();
            
            await setProfileItemss(fetchDataa.item[0]);
            await setcopyProfileItemss(fetchDataa.item[0])
            await setItemShows(true)
            
            
        }



        fetchData();
        fetchDataa();
        isDeleted(false);
    },[deleted])

    async function deleteItem(id){
        const data=await fetch('http://localhost:5000/items/lostItems',{
             method: 'DELETE',
             
             body:JSON.stringify({_id:id}),
             headers: {
                'Accept': "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true}
            })
            const fetchData=await data.json();
            isDeleted(true)
    }

    async function foundItem(id,name,email,url){
        const dataa=await fetch('http://localhost:5000/history/foundItems',{
             method: 'POST',
             body:JSON.stringify({name:name,email:email,url:url}),
             headers: {
                'Accept': "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true}
            })
        
        deleteItem(id);
            
        
        }
    

        
    
  return (
    <div>

    <button className="btn btn-dark"><a href='/Dashboard'>Dashboard</a></button>
        <center><h2 className="profile-head" style={{"color": "white"}}>User Profile: {user.name}</h2></center>
        <div className="card-divv-fetch">
        <h3 className="card-head" style={{"padding": "0.25rem"}}>Lost User Items</h3>
        
        <div className="card-flexDiv">
        <div className="card-flex-div-nested">

            {itemShow ?profileItems.filter((item)=>item.userEmail===user.email).map(profileItem =>(
               <div style={{"width":"30vw"}} className="cardd" key={profileItem._id}>
                <img src={profileItem.lostitemUrl} alt="lost-image" className="img-card"></img>
                <h2 className="lostItem">{profileItem.itemName}</h2>
                <button className="btn btn-dark media" onClick={()=>deleteItem(profileItem._id)}>Delete Item</button>
                <button className="btn btn-dark media" onClick={()=>foundItem(profileItem._id,profileItem.itemName,profileItem.userEmail,profileItem.lostitemUrl)}>Found Item</button>
                <button className="btn btn-dark media"><a href={`/update/${profileItem._id}`}>Update</a></button>
                </div>
                
            )):<div></div>}
            
        </div>
        </div>
      
    </div>
    <div style={{"padding":"3em"}}>
    <div className="card-divv-fetch" style={{"padding":"0.6rem"}}>
    <h3 className="card-head">Found User Items</h3>
        <div className="card-flexDiv">
        <div className="card-flex-div-nested">
            
            {itemShows ?profileItemss.filter((item)=>item.Email===user.email).map(profileItem =>(
               <div style={{"width":"30vw"}} className="cardd" key={profileItem._id}>
                <img src={profileItem.Url} alt="lost-image" className="img-card"></img>
                <h2 className="lostItem">{profileItem.Name}</h2>
                
                

                </div>
                
            )):<div></div>}
            
        </div>
        </div>
      
    </div>
    </div>
    </div>
  )
}

export default Profile