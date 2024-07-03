function Respond({res,status=200,message="",payload,success=true,error=null}){
    let response = {message,payload,success}
    if(error)response.error=error
    res.status(status).json(response)
}

module.exports = Respond

