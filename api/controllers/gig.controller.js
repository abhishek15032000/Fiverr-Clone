
import createError from "../utils/createError.js"
import Gig from "../models/gig.model.js"

export const createGig=async (request,response,next)=>{
     // we can create a new gig only if 
     if(!request.isSeller){
          return next(createError(403,"Only Sellers can create a Gig"));
     }
     // creating a new Gig
     const newGig=new Gig({
        ...request.body,
        userId:request.userId
     });
     
     try{
        // saving the newly created gig
        const savedGig=await newGig.save();
        // sending back the gig object send by mongoDb to us.
       return  response.status(201).json(savedGig);
     }catch(error){
        return next(error);
     }
}
export const deleteGig=async(request,response,next)=>{
     try{
        // finding the gig since each gig has a user id associated with it
        // we find it using the id which we send in the url localhost:3000/api/gigs/123
        const gig=await Gig.findById(request.params.id);
        if(gig.userId!==request.userId){
             return next(createError(403,"You can delete only your gig"))
        }
        await Gig.findByIdAndDelete(request.params.id);
        return response.status(200).send("Gig has been deleted! ");
     }catch(error){
        next(error);
     }
}
export const getGig=async(request,response,next)=>{
    // finding gig , get request , if found then send the gig object else send the error.
    try{
       const gig=await Gig.findById(request.params.id);
        if(!gig){
            next(createError(404,"Gig not found!"));
        }
       return response.status(200).send(gig);
    }catch(error){
       next(error);
    }
}
export const getGigs=async(request,response,next)=>{
    // price greater than 100 .
    // in our react app , we have gigs filtered according to categories 
    //  we can filter according to prices , newset , best selling , gigs between min and max prices .
    // we can find a gig by its title.
    

    //{{url}}gigs?category=design&search=sadd , query.category=design , query.search=add.
    const query=request.query;
    

    // it could happen that there are no filters applied in that case we need to write condition based filters.
    
    // we are checking if the category exist on the query object then we will spread the category object which contains the data.
    const filters = {
        ...(query.userId && { userId: query.userId }),
        ...(query.cat && { cat: query.cat }),
        ...((query.min || query.max) && {
          price: {
            ...(query.min && { $gt: query.min }),
            ...(query.max && { $lt: query.max }),
          },
        }),
        ...(query.search && { title: { $regex: query.search, $options: "i" } }),
      };

    try{
        // find all the gigs posted on the platform.
        const gigs = await Gig.find(filters).sort({ [query.sort]: -1 });
        return response.status(200).send(gigs);
    }catch(error){
       next(error);
    }
}
