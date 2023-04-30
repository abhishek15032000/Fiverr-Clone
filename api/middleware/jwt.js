import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const verifyToken=(request,response)=>{
    const token=request.cookies.accessToken;
    if(!token){
        return response.status(401).send("You are not authenticated! ");
    }
    const user=User.findById(request.params.id);
    jwt.verify(token,process.env.JWT_SECRET_KEY,(error,payload)=>{
        if(error){
            return response.status(403).send(" Token is not valid ! ");
        }
        request.userId=payload.id;
        request.isSeller=payload.isSeller;
    })
}