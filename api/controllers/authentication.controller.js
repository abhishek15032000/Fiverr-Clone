// import { response } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
// all these functions will be async as we are making the operation upon the database.

// we should be not be storing passwords in the plain text form , as it is a security issue of the privacy.
// so we encrypt it using library called bcrypt
export const register = async (request, response, next) => {
	try {
		// creating new User.
		const hash = bcrypt.hashSync(request.body.password, 5);
		// spread opeator to mutate the object.
		const newUser = new User({
			...request.body,
			password: hash
		});
		// saving the user to database.
		await newUser.save();
		response.status(201).send("User has been created");
	} catch (error) {
		// console.log(error);
		// response.status(500).send("Something went wrong");
		 next(error);
		// this is coming from the handleError middleware which we created to handle erorr.

	}
}
export const login = async (request, response, next) => {
	try {
		// finding the user using the userName , userName is kept unique in the model. findOne is the query we are running on the document.
		const user = await User.findOne({
			username: request.body.username
		});

        // createError is a function which creates this error object and sends to next which is an error handler function (middleware) present inside server.js for error handling.
		if (!user) {
			 next(createError(404," User not found! "));
		}
		const isPasswordCorrect = bcrypt.compareSync(request.body.password, user.password);
		if (!isPasswordCorrect) {
			 next(createError(400," Wrong password or username! "))
		}

		const token = jwt.sign({
			id: user._id,
			isSeller: user.isSeller
		}, process.env.JWT_SECRET_KEY);
		// we are encrypting or signing this object which contains these two data , id , isSeller , it will return us a token,
		// this token can be decrypted and get the data back again .
		// we are sending this token to our client back as a cookie which we are setting on the client's browser.
		// we can change or access this access token only when making http request.

		const {
			password,
			...info
		} = user._doc;
		// we were earlier sending the user, but it would have exposed the encrypted password so we are destructuring the object , and getting user out of it, which we are sending.


		// we will be using json web tokens and cookies to store access token
		// access token - means that , somebody else cannot access any resource which it does not have permission to access. , we can verify this access token before letting any action happen.
		response.cookie("accessToken", token, {
			httpOnly: true
		}).status(200).send(info)
	} catch (error) {
	   next(createError(500,"Something went wrong"))
	}
}
export const logout = async (request, response,next) => {
   return response.clearCookie("accessToken",{
     sameSite:"none",
     secure:true
   }).status(200).send("User has been logged out");

   // same site none means that our server and react is running at different osts 
   // to reach the cookie we say they are not running on the same port , then also let us access the cookie to clear it.

}