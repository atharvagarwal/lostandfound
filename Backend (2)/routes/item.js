const router = require("express").Router();
const mongoose = require("mongoose")
const dbs=require("mongodb")


const lostSchema= new mongoose.Schema({
    
    itemName:{
        type:String,
        required:true
    },
   userEmail:{
        type:String,
        required:true
    },
   contact:{
        type:String,
    },
    lostitemUrl:{
        type:String,
    },
    description:{
        type:String,
    }
   
   
})

const itemModel=mongoose.model('item',lostSchema)



router.post('/lostItems',(req,res)=>{
    try{
    itemModel.create({
        itemName:req.body.name,
        userEmail:req.body.email,
        contact:req.body.contact,
        lostitemUrl:req.body.lostitemUrl,
        description:req.body.description,
        
        
    })
    res.status(200).json({success:true,message:"data stored successfully"});
    }

    catch(err){
        res.status(400).json({success:false,message:"data not stored"});
    }

    
})



router.get('/lostItems',async (req,res)=>{
    const items=await itemModel.find()
    
    res.status(200).json({item:[items]})
})

router.delete('/lostItems',async (req,res)=>{
    try{
    const _id=req.body._id;
    
    await itemModel.deleteOne({ _id:_id})
    

    res.status(200).json({message:"data deleted successfully"})}
    catch(err){
        console.log(err)
    }}
)

router.delete('/foundandDelete',async (req,res)=>{
    try{
    const _id=req.body._id;
    console.log(req.body)
    const item=await itemModel.find({_id})
    console.log(item)
    await item[0].remove();
    res.status(200).json({message:"data deleted successfully"})}
    catch(err){
        console.log(err)
        console.log(req.body)
    }}
)

router.put("/lostItems/:id",async (req, res) => {
    
    const data = await itemModel.findById(req.params.id)
    try{
    if (!data) {
      res.status(400)
      throw new Error('Goal not found')
    }
    
   const updatedGoal = await itemModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
  
    res.status(200).json({success: true})
  }
  catch(err){
    console.log(err)
  }
}
  
)




module.exports=router