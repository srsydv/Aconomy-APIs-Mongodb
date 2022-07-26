// const dbConnect = require('../config/db.config')
// const express = require('express');
// const app = express();
// app.use(express.json());

// const signupSchema = require("../schema/schema.model");

// const mongodb = require('mongodb');

// exports.signup = async (req, res) => {
//     if (!Object.keys(req.body).length) {
//         return res.status(200).json({
//             errorcode: '208',
//             message: "Request not Provided",
//         });
//     }

//     else if (!req.body.FName || !req.body.LName || !req.body.Password || !req.body.Email) {
//         let params = [req.body.FName, req.body.LName, req.body.Password, req.body.Email];
//         let lackingParam = params.findIndex(param => !param === true) > 0 ? params.findIndex(param => !param === true) > 1 ? params.findIndex(param => !param === true) > 2 ? params.findIndex(param => !param === true) > 3 ? "" : "FName not provided" : "LName not provided" : "Password not provided" : "Email not provided"
//         return res.status(200).json({
//             errorcode: '209',
//             message: lackingParam,
//         });
//     }
//     else{
//         let data = new signupSchema(req.body);
//         let result = await data.save();
//         console.log(result);
//         res.send(result);
//     }
// }

// // app.post("/", async (req,resp)=>{
// //     let data = await dbConnect();
// //     let result = await data.insert(req.body)
// //     resp.send(result)
// // })
const signupSchema = require("../schema/schema.model");
const schema = require("../schema/schema.model");
const login_logs_schema = schema.login_logs_schemaex;
const moment = require('moment');

login3 = async (clm) => {
    return new Promise(async(resolve, reject) => {
        console.log("Hi3");
        let data = await signupSchema.find({email:clm.email,password:clm.pass});
        console.log("Hi4",data.length);
        if (data) {
            resolve(data.length);
        } else {
            reject("Error");
        }
    })
}

UpdateLoginLogsAgain = async (clm) => {
    return new Promise(async(resolve, reject) => {
        let data = new login_logs_schema({
            email: clm.email,
            hostname: clm.hostname,
            IP: clm.ip,
            lastRequestAt: clm.lastRequestAt,
            loginTime: moment().format(),
            sessionID: clm.sessionID
        });
        const result = await data.save();
        // console.log(result);
    })
}

module.exports = {
    UpdateLoginLogsAgain,
    login3
}