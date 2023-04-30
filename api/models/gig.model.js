import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const GigSchema = new Schema({
		 userId:{
            type:String,
            required:true
         },
         title:{
            type:String,
            required:true
         },
         desc:{
            type:String,
            required:true
         },
         totalStars:{
            type:Number,
            default:0
         },
         starNumber:{
            type:Number,
            default:0
         },
         category:{
            type:String,
            required:true
         },
         price:{
            type:Number,
            required:true
         },
         cover:{
            // cover image of the gig .
            type:String,
            required:true
         },
         images:{
            // images of the gig shown in the carousel is an array.
            type:[String],
            required:false
         },
         shortTitle:{
            type:String,
            required:true
         },
         shortDesc:{
            type:String,
            required:true
         },
         deliveryTime:{
            type:Number,
            required:true
         },
         revisionNumber:{
            type:Number,
            required:true
         },
         features:{
            type:[String],
            required:false
         },
         sales:{
            type:Number,
            default:0
         }

	},
	// options 
	{ // to know when the user object was created
		timestamps: true
	}
);

export default mongoose.model("Gig",GigSchema);
// Gig will be the model name when stored in mongoDb.