import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const ReviewSchema = new Schema({
	   gigId:{
        type:String,
        required:true,
       },
       userId:{
         type:String,
         required:true
       },
       star:{
        type:Number,
        required:true,
        // since star value could be only among these values . 
        enum:[1,2,3,4,5]
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

export default mongoose.model("Review",ReviewSchema);
// Review will be the model name when stored in mongoDb.