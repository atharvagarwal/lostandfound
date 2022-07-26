
import './App.css';
import Landing from './Pages/Landing';

import Dashboard from './Pages/Dashboard';

import LostForm from './Components/LostForm'
import LostupdateForm from './Components/LostupdateForm'
import Profile from './Pages/Profile'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import userAuthContext from "./UserContext"
import {useContext,useEffect,useState}  from "react";


function App() {
  const {user,auth,userState} = useContext(userAuthContext)
  const [appUser,setappUser]=useState()
  useEffect(() => {
    
    getUser();
  },[]);
  const getUser = () => {
    fetch("http://localhost:5000/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("authentication has been failed!");
      })
      .then((resObject) => {
      userState(resObject.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      {console.log(auth)}
      
      <BrowserRouter>
      
    <Routes>
    
      <Route path="/" element={!auth?<Landing />:<Dashboard/>}/>
        <Route path="/Dashboard" element={auth?<Dashboard />:<Landing/>} />
          <Route path="/lostForm" element={auth?<LostForm />:<Landing/>}/>
          <Route path="/profile" element={auth?<Profile />:<Landing/>}/>
          <Route path="/update/:id" element={auth?<LostupdateForm />:<Landing/>}/>
    </Routes>
    
  </BrowserRouter>
  
     
    </div>
  );
}

export default App;
