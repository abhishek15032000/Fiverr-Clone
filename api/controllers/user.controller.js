import User from '../models/user.model.js';
import createError from '../utils/createError.js';
export const deleteUser = async (request, response,next) => {
	// since we are hitting the api /api/user/deleteUser/:id - we can get the id of the user to be deleted using req.params.id and perform this 
	// but before this we need to be sure that the person who wants to execute this task , has permission to make such a request or not . 
	// for verification of permission we use jwt token.

	const user = await User.findById(request.params.id);

	// await User.findByIdAndDelete(request.params.id);

	// if token exists verify the permissions
	// first decrypt the token.


	// this function will be called , if there is error it will show the error 
	// or will show the data decrypted inside payload .
	//  the id is an ObjectId so we convert it into a string then check.
	if (request.id !== user._id.toString()) {
		// return response.status(403).send("You can only delete your account ");
		next(createError(403,"You can only delete your account "));
	} else {
		await User.findByIdAndDelete(request.params.id);
	}
	// this payload would contain all the data which we signed and also send the issued time at , if the time expires we cannot use this token.
	/**
	 * {
	        "id": "644dc8f7cbc55a6326e7139d",
	        "isSeller": false,
	        "iat": 1682820872
	   }
	 */
	response.status(200).send("Deletion Successfull");

}

// since for any operation we need to verify this , instead of writing verification logic for everywhere , 
// middleware we write to make this verification process easier.