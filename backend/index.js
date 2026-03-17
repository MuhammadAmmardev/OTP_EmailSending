const express=require('express');
const nodemailer=require('nodemailer');
const mongoose=require('mongoose');
const otpRecord=require('./model/otpRecord')
const UserRecord=require('./model/UserRecord')
const app=express();
const cors=require('cors');




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
            pass:'xtrtupvjyjqfsbyb'
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


app.post('/verify-otp', async(req,res)=>{

    const { otp, userData } = req.body; // get otp and userData object

    const { username, email, password } = userData; // extract fields from userData

const User=await UserRecord.findOne({email})
if(User){
     return res.status(400).json({
     message:"User Already Registered"
    })
}

const OTP=await otpRecord.findOne({email})

if(!OTP){
    return res.status(400).json({
        message:"OTP expire or not find"
    })
}
console.log(OTP.otp)
if(OTP.otp !== otp){
    return res.status(400).json({
        message:"Invalid  OTP!!!"
    })
}

const newUser=await UserRecord.create({
    username,
    email,
    password
})
 
res.status(200).json({
    message: "User Registered Successfully",
});

})

app.listen(3000,()=>{
    console.log("Server start listing on port 3000")
})