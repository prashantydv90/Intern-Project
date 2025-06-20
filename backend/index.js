import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import itemRouter from "./app/routes/item.routes.js";

const app=express();
dotenv.config();

app.use(express.json());

const corsOptions={
  origin:process.env.CURL,
  credentials:true
}
app.use(cors(corsOptions));

app.use('/api',itemRouter)


mongoose.connect(process.env.URL).then(()=>{
  console.log("connected to mongoDB");
  app.listen(process.env.PORT || 5001,()=>{
    console.log("server listen on port ",process.env.PORT || 5001)
  });
}).catch((err)=>{
  console.log(err); 
})