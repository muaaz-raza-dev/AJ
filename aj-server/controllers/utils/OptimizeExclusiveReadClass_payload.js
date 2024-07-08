const OptimizeExclusiveReadClass_payload = (class_payload) => {
    let payload = JSON.parse(JSON.stringify(class_payload));
    payload.Session = payload.SessionId;
    delete payload.SessionId;
    payload.Students = [];
    class_payload.sections.forEach((section, i) => {
      if (payload.Students.length != 5) {
        payload.Students.push(...section.Students);
      }
      let new_Subject_Teacher = []
       section.Subjects_teachers.forEach((obj) =>{
        new_Subject_Teacher.push(
        {
        ...obj._doc,
        Teachers: obj.Teachers.map((teacher) =>
            
     {
        
        return({
          firstName: teacher.firstName,
          lastName: teacher.lastName,
          _id: teacher._id,
          photo:teacher.photo
        }
    )}
),
      })}
    )
 let{firstName , lastName , photo ,_id} =section.ClassTeacher
    payload.sections[i].ClassTeacher = {firstName,lastName,photo,_id};
      payload.sections[i].Subjects_teachers = new_Subject_Teacher;
    });
    return payload;
}

module.exports = OptimizeExclusiveReadClass_payload