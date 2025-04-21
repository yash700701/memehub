import { connect } from '@/dbConfig/dbConfig'
import Users from '@/models/userModel'
import {z} from 'zod'
import { userNameValidation } from '@/schemas/signupSchema'


const userNameQuerySchema = z.object({
    userName : userNameValidation
})

export async function GET(request: Request){
    await connect();

    try {
        const {searchParams} = new URL(request.url)
        const queryParam = {
            userName: searchParams.get('username')
        }
        const result = userNameQuerySchema.safeParse(queryParam)
        if(!result.success){
            const userNameErrors = result.error.format().userName?._errors || []
            return Response.json({
                success: false,
                message: userNameErrors?.length > 0 ? userNameErrors.join(', ') : 'invalid query parameters'
            },{status: 400})
        }

        const {userName} = result.data

        const existingVerifiedUser = await Users.findOne({userName, isVerified: true})
        if(existingVerifiedUser){
            return Response.json({
                success: false,
                message: "username is already taken"
            }, {status: 400})
        }
        return Response.json({
            success: true,
            message: "username available"
        }, {status: 200})

    } catch (error) {
        console.log("error checking username", error);
        return Response.json({
            success: false,
            message: "error checking username"
        },{status: 500})
    }
}