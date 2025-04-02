import {resend} from '@/lib/resend'
import VerificationEmail from '../../emails/verificationEmail'


export async function sendVerificationEmail(
    email: string,
    userName: string,
    verificationCode: string, 
){
    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "verification code | Meme Hub",
            react: VerificationEmail({ username: userName , otp: verificationCode})
        });
    } catch (error) {
        console.error("error sending verification email", error)
        return {success: false, message: 'failed to send verification email'}
    }
}
