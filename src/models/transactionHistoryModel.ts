import mongoose, {Schema, Document} from "mongoose";



export interface TransactionType extends Document{
    description: Text;
    amount: number;
    userId: string;
    createdAt: Date; 
} 

const TransactionSchema: Schema<TransactionType> = new mongoose.Schema({
   description: {
      type: String,
      required: true,
   },
   userId: {
      type: String,
      reqiured: true,
   },
   amount: {
      type: Number,
      required: true,
   }
}, { timestamps: true })

const Transactions = mongoose.models.transactions as mongoose.Model<TransactionType> || mongoose.model<TransactionType>("transaction", TransactionSchema)

export default Transactions