require('dotenv').config()
const app = require("express")()
const express = require("express")
const {MongoConnection }= require('./db');
const cors = require('cors');
const Port = 6900 || process.env.PORT;
const server = require('http').createServer(app)

app.use(express.json())
app.use(cors({
  origin:["http://localhost:5173","https://flexzon.vercel.app","https://recordss.vercel.app"],
  credentials:true,
}))


app.use("/api/auth",require("./routes/Auth"))
app.use("/api/studentRegisteration",require("./routes/StudentRegisteration"))
app.use("/api/students",require("./routes/ReadStudents"))
app.use("/api/student",require("./routes/ReadStudentExclusive"))
app.use("/api/global",require("./routes/Global"))
app.use("/api/transactions",require("./routes/Transactions"))
app.use("/api/dashboard",require("./routes/Teacher&Classes"))
app.use("/api/session" ,require("./routes/Yearly_sesstion"))
app.use("/api/payments/config",require("./routes/SchoolPayments"))


MongoConnection()
server.listen(Port, () => {
  console.log(`records server is listening on http://localhost:${Port}`);
});
