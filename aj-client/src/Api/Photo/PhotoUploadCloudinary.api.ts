const PhotoUploadCloudinary =async (Image:File) => {
        let form = new FormData()
        form.append("file",Image)
        form.append("upload_preset","AJ academic assets")
        form.append("cloud_name","dz8a9sztc")
    let response =await fetch("https://api.cloudinary.com/v1_1/dz8a9sztc/upload",{
        method:"POST"
        ,body:form
    })
    let result = await response.json()
    return result
}

export default PhotoUploadCloudinary