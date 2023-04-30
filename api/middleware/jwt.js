import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import createError from '../utils/createError.js';

export const verifyToken=(request,response,next)=>{
    const token=request.cookies.accessToken;
    if(!token){
        next(createError(401,"You are not authenticated"));
    }
    const user=User.findById(request.params.id);
    jwt.verify(token,process.env.JWT_SECRET_KEY,(error,payload)=>{
        if(error){
            next(createError(403,"Token is not valid !"));
        }
        request.userId=payload.id;
        request.isSeller=payload.isSeller;
        next();
        // next() to move to the next function after verification
    })
}