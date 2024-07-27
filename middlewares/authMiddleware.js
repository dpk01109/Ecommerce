import JWT from 'jsonwebtoken';
import userModel from "../models/userModel.js";

//protected routes token base
export const requireSignIn = async(req,res,next) =>{
    // console.log(process.env.JWT_SECRET )
    // console.log(req.headers.authorization)
    // console.log()
    try{
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET
            );
        req.user = decode;    
        next();
    }catch(error){
        console.log(error)
    }
};

//admin access
export const isAdmin = async(req,res,next) =>{
    // console.log("hello")
     try{
        const user= await userModel.findById(req?.user?._id);
        // console.log(req.user.id)
        if(user?.role !== 1){
            return res.status(401).send({
                success:false,
                message:'UnAuthorized Access',
            });
        }else{
            next();
        }
     }catch(error){
        console.log(error);
        res.status(401).send({
           success:false,
            error,
            message:"Error in admin middleware",
        });
     }
};