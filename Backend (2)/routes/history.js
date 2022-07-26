const router = require("express").Router();
const mongoose = require("mongoose")
const express= require("express")
const app=express();

const dbs=require("mongodb")


const historySchema= new mongoose.Schema({
    
    Name:{
        type:String,
        required:true
    },
   Email:{
        type:String,
    },
    Url:{
        type:String,
    }
    
   
})

const itemModel=mongoose.model('history',historySchema)



router.post('/foundItems',(req,res)=>{
    console.log(req.body)
    itemModel.create({
        Name:req.body.name,
        Email:req.body.email,
        Url:req.body.url
    })
    res.status(200).json({message:"data stored successfully"});
})



router.get('/foundItems',async (req,res)=>{
    const items=await itemModel.find()
    
    res.status(200).json({item:[items]})
})





module.exports=router