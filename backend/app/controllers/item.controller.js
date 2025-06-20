import { Item } from "../models/item.model.js";
import nodemailer from "nodemailer";

export const addItem= async (req,res)=>{
  try {
    let {itemName,itemType,description}=req.body;
    const coverImage = req.files.coverImage[0].path;
    const additionalImages = req.files.additionalImages?.map(file => file.path);
    const item= await Item.create({
      itemName,
      itemType,
      description,
      coverImage,
      additionalImages,
    });
    return res.status(201).json({
      message:"new item added",
      item,
      success:true
    })
  } catch (error) {
    console.log(error);
  }
}


export const getAllItems=async(req,res)=>{
  try {
    const items= await Item.find().sort({createdAt:-1});
    return res.status(200).json({
      items,
      success:true
    })
  } catch (error) {
    console.log(error);
  }
}

export const itemDetail=async(req,res)=>{
  try {
    const id=req.params.id;
    const item=await Item.findById(id).sort({createdAt:-1});
    if(!item){
      return res.status(404).json({message:"item not found"});
    }
    return res.status(200).json({
      item,
      success:true
    })
  } catch (error) {
    console.log(error)
  }
}

export const emailsend= async(req,res)=>{
  const { itemName, itemType, description } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // use app password if 2FA is on
      },
    });

    const mailOptions = {
      from: `"Item Enquiry" <${process.env.EMAIL_USER}>`,
      to: "prashantpky111yadav@gmail.com",
      subject: `New Enquiry: ${itemName}`,
      text: `Item Name: ${itemName}\nType: ${itemType}\nDescription: ${description}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}