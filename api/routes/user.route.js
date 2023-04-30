import express from 'express';
import { deleteUser } from '../controllers/user.controller.js';
// create end points using express router

const router=express.Router();

// request is the request comming from the user, response is what we are providing the user.
// so we can access this route as localhost:3000/api/users/test  , method:get 

// we will be writing the callback function to handle the request in the controller folder. to provide MVC architecture.

// router.get("/test",(request,response)=>{
//     response.send("it works");
// });

router.get('/delete/:id',deleteUser);

export default router;
