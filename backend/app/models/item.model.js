import mongoose from "mongoose";
const itemSchema= new mongoose.Schema({
  itemName:{
    type:String,
    required:true
  },
  itemType:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  coverImage:{
    type:String,
  },
  additionalImages:{
    type:[String],
  } 
},{timestamps:true})

export const Item=mongoose.model("Item",itemSchema)