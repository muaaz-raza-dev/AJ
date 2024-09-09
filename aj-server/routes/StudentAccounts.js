
const express = require('express');
const { getStudentAccountInfo, toggleStdAccountRestriction, resetPassword } = require('../controllers/StudentAccounts.controller');

const app = express.Router();

app.get('/:gr',getStudentAccountInfo);
app.put("/block/:id",toggleStdAccountRestriction)
app.put("/reset/password",resetPassword)
//asdf
module.exports = app;
