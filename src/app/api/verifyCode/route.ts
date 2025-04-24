import { connect } from '@/dbConfig/dbConfig'
import Users from '@/models/userModel'

export async function POST(request: Request){
    await connect();
    try {
        const {email, code} = await request.json();
        const decodedEmail = decodeURIComponent(email);
        const user = await Users.findOne({email: decodedEmail});
        if(!user){
            return Response.json({
                success: false,
                message: "user not found",
            }, {status: 500})
        }

        const isCodeValid = user.verificationCode == code;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true;
            await user.save();
            return Response.json({
                success: true,
                message: "account verified successfully",
            }, {status: 200})
        }else if(!isCodeNotExpired){
            return Response.json({
                success: false,
                message: "verification code has expired , signup again to get a new code",
            }, {status: 400})
        }else{
            return Response.json({
                success: false,
                message: "verification code incorrect",
            }, {status: 400})
        }

    } catch (error) {
        console.log("error verifying user", error);
        return Response.json({
            success: false,
            message: "error verifying user"
        }, {status: 500})
    }
}

