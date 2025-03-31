import mongoose, {Schema, Document} from "mongoose";



export interface userType extends Document{
    userName: string;
    email: string;
    password: string;
    isVerified: boolean;
    verifyCode: string;
    verifyCodeExpiry: Date;
} 

const userSchema: Schema<userType> = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "username is required"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "emial is required"],
        unique: true,
        match: [/.+\@.+\..+/, 'please use a valid email address']
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    verifyCode: {
        type: String,
        required: [true, "verify code is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "verify code expiry is required"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
})

const Users = mongoose.models.user as mongoose.Model<userType> || mongoose.model<userType>("user", userSchema)

export default Users