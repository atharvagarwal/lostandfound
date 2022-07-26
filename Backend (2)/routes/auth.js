const router = require("express").Router();
const passport = require("passport");
const bcrypt=require("bcrypt")
const CLIENT_URL = "http://localhost:3000/dashboard"
const userModel = require("../model/userModel")

const mongoose = require("mongoose")




router.post('/Signin',async (req,res)=>{
const salt= await bcrypt.genSalt(10)

const hashedPassword = await bcrypt.hash(req.body.password,salt)
const email = req.body.email
const userExists =  await userModel.findOne({email})

if(userExists){
    res.status(404)
    res.send('The User Already Exists')
   
}
 else{
    userModel.create({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,

    })
    res.status(200).json({message:"data stored"});
}})

router.get('/users',(req,res)=>{
    const items=userModel.find()
    
    res.status(200).json(items)
})



router.post("/formAuth",

async function(req, res) {

    email=req.body.email;
    password=req.body.password;
    const user= await userModel.find({email});
    
    if(user.length!=0){
    if(await (bcrypt.compare(password,user[0].password))){
      passport.authenticate("cookie", { session: false })
      
      console.log("authenticated")
      res.redirect('/success/authentication')
    }}
    else{
    res.status(400).json({message:"Invalid Credentials"});
    }
    
  });



router.get("/google", passport.authenticate("google", { scope: ["profile","email"] }),()=>{

});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/login/success", (req, res) => {
  
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "success",
      user: req.user,
      //cookies: req.cookies
    });
  }
  else{
    res.status(400).json({success: false, message: "Invalid Credentials Or Not Logged In"});
  }
});

router.get("/login/failed", (req, res) => {
  
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get('/success/authentication',(req, res) => {
  console.log(req.body)
})


router.get("/logout", (req, res) => {
  
  req.logout();
  res.redirect(CLIENT_URL);
});


module.exports = router
