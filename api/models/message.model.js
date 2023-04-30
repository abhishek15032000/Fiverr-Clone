import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const MessageSchema = new Schema({
	    ConversationId:{
            type:String,
            required:true
        },
        UserId:{
            type:String,
            required:true
        },
        desc:{
            type:String,
            required:true
        }
	},
	// options 
	{ // to know when the user object was created
		timestamps: true
	}
);

export default mongoose.model("Message",MessageSchema);
// Message will be the model name when stored in mongoDb.