function dataResponse(data:any, status:number, message:string){
    return{
        content_type:'Application/JSON',
        data,
        message,
        status
    }
}

export default dataResponse