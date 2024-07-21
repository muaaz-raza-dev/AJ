const Sections_Class = require("../../../models/Sections_Class");

const CalculateClassHistory = async (studentId) => {
  let history = (await Sections_Class.find({ Students: studentId })
      .populate({path:"Class",select:"SessionId"})
        .sort({
          end_date: -1,
        })
  )
  let payload= JSON.parse(JSON.stringify(history))
payload.forEach((doc, i) => {
    payload[i].Section =  doc._id ;
    payload[i].Session = doc.Class.SessionId
    payload[i].Class =  doc.Class._id ;
    payload[i].Date =doc.Class.start_date
  });
  return payload;
};

module.exports = CalculateClassHistory;
