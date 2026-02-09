class  apiError extends Error{
    constructor(
        statuscode,
        message="kuch to glt hai bhai",
        errors=[],
        stack= ""
    )
    {
        super(message);
        this.satuscode=statuscode;
        this.errors=errors;
        this.data=null;
        this.success=false;

        if(stack){
            this.stack=stack;
        }
        else{
            Error.captureStackTrace(this,this.constructor);
        }
    }
} 
export default apiError;