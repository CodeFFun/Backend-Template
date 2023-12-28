
interface properties{
    [key: string]: any
}

function errorResponse(error:any){
    const errors: Record<string, any> = {}
    //user validation

    //check if email exists or not
    if(error.code === 11000){
         return 'Email already exists, try signing in'
    }
    
    //check if valid or not
    if(error.message.includes('User validation failed')){
        Object.values(error.errors).forEach((err:any) => {
            const properties:properties = err.properties
           errors[properties.path] = properties.message
        })
        return errors
    }
    
      
}

export default errorResponse