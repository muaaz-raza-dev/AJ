const Respond = require("../../Helpers/ResponseHandler");
const Diary = require("../../models/Diary");
const moment = require("moment")
const {ObjectId} =require("mongodb")
const getDiaries = async (req,res) =>{
const {date} =req.body;
const startOfDay = moment(date, "YYYY-MM-DD").startOf("day").toDate();
const endOfDay = moment(date, "YYYY-MM-DD")
  .add(1, "day")
  .startOf("day")
  .toDate();
const diaries = await Diary.aggregate([
    {
        $match: {
          "date":{$gte:startOfDay,$lt:endOfDay}
      }
      },
    {
      $lookup: {
        from: "sections",
        localField: "sections",
        foreignField: '_id',
        as: 'sections'
      }
    },
    {
      $match: {
        "sections.Students":new ObjectId(req.details.Student)
    }
    }, 
    {
        $addFields: {
            isSeen: { $in: [req.details.Student, "$seenBy"] }
        }
    },
    {
        $project: {images:0,content:0,createdAt:0,seenBy:0,sections:0,publishedBy:0,updatedAt:0,__v:0}
    } 
 
    
  ]
)

return Respond({res,payload:diaries})
}

const ReadDiary = async (req, res) => {
  try {
    const { id } = req.params; 

    if (!id||id.length!=24) return Respond({ res, success: false, message: "Diary id is required" });
    const diary = await Diary.aggregate([
      {
          $match: {
            "_id":new ObjectId(id)
        }
        },
      {
        $lookup: {
          from: "sections",
          localField: "sections",
          foreignField: '_id',
          as: 'sections'
        }
      },
      {
        $match: {
          "sections.Students":new ObjectId(req.details.Student)
      }
      }, {
          $project: {createdAt:0,sections:0,publishedBy:0,updatedAt:0,__v:0}
      }
    ]
  )
    if (!diary) return Respond({ res, success: false, message: "Diary not found" });

    if (!diary[0]?.seenBy?.some(d=>d?.toString()==req.details.Student.toString())) {
        await Diary.findByIdAndUpdate(id, { $addToSet: { seenBy: req.details.Student.toString() } });
    }
    return Respond({ res, payload:{...diary?.[0]} });
  } catch (err) {
    console.log(err);
    return Respond({
      res,
      success: false,
      message: "An error occured. Try again.",
      status: 501,
      error: err,
    });
  }
};

module.exports = {getDiaries,ReadDiary}