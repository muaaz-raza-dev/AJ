require('dotenv').config()
const app = require("express")()
const express = require("express")
const {MongoConnection }= require('./db');
const cors = require('cors');
const AuthenticateStudents = require('./middlewares/AuthenticateStudents.middleware');
const Authenticate = require('./middlewares/Authenticate.middleware');
const getUserDeveiceInfo = require('./utils/getUserDeviceInfo');
const {ExtractIpAddress,getLocationFromIP} = require('./utils/getLocationFromIp');
const Port = 6900 || process.env.PORT;
const server = require('http').createServer(app)
const requestIp = require('request-ip');
app.use(express.json())
app.use(requestIp.mw())
app.use(cors({
  origin:["http://localhost:5173","http://localhost:3000","https://ajfoundation.site","https://admin.ajfoundation.site"],
  credentials:true,
}))
//? testing
app.get("/",async(req,res)=>{ 
  const DeviceInfo = getUserDeveiceInfo(req)
  const ip = ExtractIpAddress(req);
  const locationData  =await getLocationFromIP(ip)
  res.json({message:"API is up and running",DeviceInfo,locationData})
})
//Student
app.use("/api/std/auth",require("./routes/Student/StudentAuth"))
app.use("/api/std/info",AuthenticateStudents,require("./routes/Student/StudentInfo"))
app.use("/api/std/class",AuthenticateStudents,require("./routes/Student/StudentClass"))
app.use("/api/std/transactions",AuthenticateStudents,require("./routes/Student/StudentTransactions"))
app.use("/api/std/diary",AuthenticateStudents,require("./routes/Student/StudentDiary"))

//Staffs/Admins
app.use("/api/auth",require("./routes/Auth"))
app.use("/api/studentRegisteration",require("./routes/StudentRegisteration"))
app.use("/api/students",require("./routes/ReadStudents"))
app.use("/api/student",require("./routes/ReadStudentExclusive"))
app.use("/api/global",require("./routes/Global"))
app.use("/api/transactions",require("./routes/Transactions"))
app.use("/api/dashboard",require("./routes/Teacher&Classes"))
app.use("/api/session" ,require("./routes/Yearly_sesstion"))
app.use("/api/payments/config",require("./routes/PaymentsConfigs"))
app.use("/api/history",require("./routes/StudentHistroy"))
app.use("/api/users",require("./routes/Users"))
app.use("/api/stats",require("./routes/Stats"))
app.use("/api/settings/advanced",require("./routes/Settings-Advanced"))
app.use("/api/diary",Authenticate,require("./routes/Diary"))
app.use("/api/students/account",Authenticate,require("./routes/StudentAccounts"))   


MongoConnection()

server.listen(Port, () => {
  console.log(`records server is listening on http://localhost:${Port}`);
});

		

