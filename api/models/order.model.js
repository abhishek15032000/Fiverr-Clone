import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const OrderSchema = new Schema({
	    gigId:{
            type:String,
            required:true
        },
        img:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        sellerId:{
            type:String,
            required:true
        },
        buyerId:{
            type:String,
            required:true
        },
        isCompleted:{
            type:Boolean,
            default:false
        },
        payment_intent:{
            type:String,
            required:true
        }
	},
	// options 
	{ // to know when the user object was created
		timestamps: true
	}
);

export default mongoose.model("Order",OrderSchema);
// Order will be the model name when stored in mongoDb.