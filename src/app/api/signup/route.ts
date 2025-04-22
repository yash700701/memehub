import {connect } from '@/dbConfig/dbConfig'
import Users from '@/models/userModel'
import bcrypt from 'bcryptjs'
import { sendVerificationEmail } from '@/helpers/sendVerificationEmail'

export async function POST(request: Request){
    await connect();

    try {
        const {userName, email, password} = await request.json();
        const existingUserVerifiedByUserName = await Users.findOne({userName, isVerified: true})

        if(existingUserVerifiedByUserName){
            console.log(existingUserVerifiedByUserName);
            
            return Response.json({
                success: false,
                message: "user name is already taken"
            }, {status: 400})
        }

        const existingUserByEmail = await Users.findOne({email})
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return Response.json({
                    success: false,
                    message: "user already exist with this email" 
                }, {status: 400})
            }else{
                  const hashedPassword = await bcrypt.hash(password, 10)
                  existingUserByEmail.password = hashedPassword;
                  existingUserByEmail.verificationCode = verificationCode;
                  existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
                  await existingUserByEmail.save()
            }
        }else{
            const hashedPassword = await bcrypt.hash(password , 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new Users({
                userName,
                email,
                password: hashedPassword,
                verificationCode,
                verifyCodeExpiry: expiryDate,
            })
            await newUser.save();
        }

        // send verification email
        const emailResponse = await sendVerificationEmail(
            email, userName, verificationCode
        )

        // if(!emailResponse?.success){
        //     return Response.json({
        //         success: false,
        //         message: emailResponse?.message 
        //     }, {status: 500})
        // }

        return Response.json({
            success: true,
            message: "user registered successfully. Please verify your email" ,
            userName, email, password
        }, {status: 201})

    } catch (error) {
        console.error('error registering user', error)
        return Response.json({success: false, message: "error registering user"}, {status: 500})
    }
}

