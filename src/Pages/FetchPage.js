import React from 'react'

import {useEffect,useState} from 'react'
import './FetchPage.css'
const FetchPage = () => {
    const [lostitemData,setlostitemData] =useState([])
    const[dataSearch,setDataSearch] = useState([])

    const [showComponent,setshowComponent] = useState(false)
    const [showDescription,setshowDescription] = useState(false);
    const[Description,setDescription]= useState("")
    const[id,setId]=useState('')

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
            
            await setlostitemData(fetchData.item[0]);
            await setDataSearch(fetchData.item[0])
            await setshowComponent(true)

           
        }
        fetchData()
    },[])

const filterResults=(value)=>{
    if(value!==""){
    setlostitemData(lostitemData.filter((lostItem)=>{return lostItem.itemName.includes(value.toLowerCase()); }))}
    else{
        setlostitemData(dataSearch)
    }
   }
   

  return (

    <div className="card-divv-fetch" >
        <h1 className="card-head">Lost Items</h1>
        <input type="text" className="form-control" placeholder="Search" style={{"width":"50vw","marginBottom":"1.25rem"}} onChange={(e)=>{filterResults(e.target.value)}}/>
        <div className="card-flexDiv">
        <div className="card-flex-div-nested">

            {showComponent ?lostitemData.map(lostItem =>(
               
    
      
    
                <div className="cardd container-fluid" key={lostItem._id}>
                <img src={lostItem.lostitemUrl} alt="lost-image" className="img-card"></img>
                <h2 className="lostItem">{lostItem.itemName }</h2>
                <p className="contact">Contact No: {lostItem.contact}</p>
                <p className="contact"><a href={`mailto: ${lostItem.userEmail}`}>Contact Via Mail</a></p>
                 
                 <p className="desc">{!showDescription || id!==lostItem._id ? lostItem.description.slice(0,90)+"..." : Description}</p>
                {!showDescription || id!==lostItem._id ?<button className="btn btn-light" style={{"float": "right"}} onClick={()=>{setDescription(lostItem.description);
                setshowDescription(true);setId(lostItem._id);}}>Read More......</button>:<></>}
                <br></br>
                
            </div>
          
                
            )):<div></div>}
            
        </div>
        </div>

    </div>
  )
}

export default FetchPage