const PhotoUploadCloudinary =async (Image:File) => {
        const form = new FormData()
        form.append("file",Image)
        form.append("upload_preset","AJ academic assets")
        form.append("cloud_name","dz8a9sztc")
    const response =await fetch("https://api.cloudinary.com/v1_1/dz8a9sztc/upload",{
        method:"POST"
        ,body:form
    })
    const result = await response.json()
    return result
}

export const UploadMultiplePhotosCloudinary =async (Images:File[]) => {
    const  response =Images.map(async (img)=>{
        const form = new FormData()
        form.append("file",img)
        form.append("upload_preset","AJ academic assets")
        form.append("cloud_name","dz8a9sztc")
        const response =await fetch("https://api.cloudinary.com/v1_1/dz8a9sztc/upload",{
            method:"POST"
            ,body:form
        })
        const result = await response.json()
        return result
    })
    const results = await Promise.all(response)
    return results
}


export default PhotoUploadCloudinary