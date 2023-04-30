import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const ConversationSchema = new Schema({
		id:{
            type:String,
            required:true,
            unique:true
        },
        buyerId:{
            type:String,
            required:true
        },
        sellerId:{
            type:String,
            required:true
        },
        readBySeller:{
            type:Boolean,
            required:true
        },
        readByBuyer:{
            type:Boolean,
            required:true
        },
        lastMessage:{
            type:String,
            required:false
        }
	},
	// options 
	{ // to know when the user object was created
		timestamps: true
	}
);

export default mongoose.model("Conversation",ConversationSchema);
// Conversation will be the model name when stored in mongoDb.