const express=require('express');
const nodemailer=require('nodemailer');
const mongoose=require('mongoose');
const otpRecord=require('./model/otpRecord')
const app=express();
const cors=require('cors')



app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/OTP_Verification')
.then(()=> console.log('Database connect successfully'))
.catch((error)=> console.log(error))

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000)
}


async function sendOTP(email,otp){

    const transporter= nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'ammarkhan1018@gmail.com',
            pass:'debqkgznmtoeofrk'
        }
    });

    const mailOPtions= {
        from:'ammarkhan1018@gmail.com',
        to:email,
        subject:"Your OTP code",
        text: `Your OTP code is ${otp}`
    }

    await transporter.sendMail(mailOPtions)
}




app.post('/register',async (req,res)=>{
    const {username,email,password}=req.body;
    const otp=generateOTP();
    await sendOTP(email,otp)
   
    const otpDb=await otpRecord.create({
         email:email,
         otp:otp
    })
    
    res.json({
        message:"OTP Generated Successfully"
    })
})


app.post('/verify-otp', (req,res)=>{
const {otp,email}=req.body;
console.log(otp,email)
})

app.listen(3000,()=>{
    console.log("Server start listing on port 3000")
})