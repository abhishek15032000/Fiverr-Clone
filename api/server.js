import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from "./routes/user.route.js";
import reviewRoute from './routes/review.route.js';
import orderRoute from './routes/order.route.js';
import messageRoute from './routes/message.route.js';
import gigRoute from './routes/gig.route.js';
import conversationRoute from './routes/conversation.route.js';
import authRoute from "./routes/auth.route.js";
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();
// if we dont do this, then the user's json request or the json body send by the user cannot be processed . so we use it. 
// using this we can send json data from the client side and we get that data in the request.body =  which will be the json data send by the client.
app.use(express.json());  // first middleware
app.use(cookieParser());  // second middleware
// connect with the database
mongoose.connect(process.env.MONGO_DB_URL, {
	useNewUrlParser: true
});
var db = mongoose.connection;
// connections  inherit from node js event emitter class , and emit events when something happens to the connection, like losing connection.

db.on('connected', () => {
	console.log('Mongoose default connection is open');
});

db.on('error', (err) => {
	console.log(`Mongoose default connection has occured \n${err}`);
});

db.on('disconnected', () => {
	console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
	db.close(() => {
		console.log('Mongoose default connection is disconnected due to application termination');
		process.exit(0);
	});
});


// using these routes .

// whenever we make a request to this end point we will be using this userRoute to get the data.
app.use("/api/auth",authRoute);
app.use('/api/users',userRoute);
app.use("/api/gigs",gigRoute);
app.use("/api/orders",orderRoute);
app.use("/api/conversations",conversationRoute);
app.use("/api/messages",messageRoute);
app.use("/api/reviews",reviewRoute);

app.listen(3000, () => {
	console.log(`backend server is running at port no ${3000}`);
})