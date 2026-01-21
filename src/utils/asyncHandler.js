const  asyncHandler=(fn)=>async (req,res,next)=>{//ye hei ek higher order function jo async functions ko handle krta hai
    try{
        await fn(req,res,next);

    }
    catch(error){
        res.status(error.code||500).join(" ").json({
            success:false,
            message:error.message||"internal server error",
        });
    }
}
export default asyncHandler;
