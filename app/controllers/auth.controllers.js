const Authtable = require("../models/auth.model.js");
const jwt = require('jsonwebtoken');

const dbConnect = require('../config/db.config')
const express = require('express');
const app = express();
app.use(express.json());
const moment = require('moment');
const schema = require("../schema/schema.model");
const signupSchema = schema.signupSchemas;
const login_logs_schema = schema.login_logs_schemaex;
const authModel = require("../models/auth.model")

const mongodb = require('mongodb');

exports.signup = async (req, res) => {
    if (!Object.keys(req.body).length) {
        return res.status(200).json({
            errorcode: '208',
            message: "Request not Provided",
        });
    }

    else if (!req.body.password || !req.body.email) {
        let params = [req.body.FName, req.body.LName, req.body.Password, req.body.Email];
        let lackingParam = params.findIndex(param => !param === true) > 0 ? params.findIndex(param => !param === true) > 1 ? "" : "Password not provided" : "Email not provided"
        return res.status(200).json({
            errorcode: '209',
            message: lackingParam,
        });
    }
    else{
        let data = new signupSchema(req.body);
        let result = await data.save();
        console.log(result);
        res.send(result);
    }
}

// app.post("/", async (req,resp)=>{
//     let data = await dbConnect();
//     let result = await data.insert(req.body)
//     resp.send(result)
// })

exports.getdata = async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    var user = jwt.decode(token, process.env.JWT_SECRET)
    console.log("yyy",user)
    let data = await signupSchema.find();
    // let result = await data.insert(req.body)
    res.json(data)
}
// app.get("/", async (req,resp)=>{
//     // let data = await dbConnect();
//     let data = await signupSchema.find();
//     // let result = await data.insert(req.body)
//     resp.send(data)
// })

login2 = async (clm) => {
    return new Promise(async(resolve, reject) => {
        console.log("dddd",signupSchema)
        let data = await signupSchema.find({address:clm.address});
        if (data) {
            console.log("ffff",data)
            resolve(data);
        } else {
            reject("Error");
        }
    })
}

// l = UpdateLoginLogs(authuser1, async(err, data) => {
//     let data1 = new login_logs_schema({
//         email: clm.email,
//         hostname: clm.hostname,
//         IP: clm.ip,
//         lastRequestAt: clm.lastRequestAt,
//         loginTime: moment().format(),
//         sessionID: clm.sessionID
//     });
//     const result = await data1.save();
//     console.log("xyyyyy",result);
//                 });

UpdateLoginLogs = async (clm) => {
    return new Promise(async(resolve, reject) => {
        let data = new login_logs_schema({
            address: clm.address,
            hostname: clm.hostname,
            IP: clm.ip,
            lastRequestAt: clm.lastRequestAt,
            loginTime: moment().format(),
            sessionID: clm.sessionID
        });
        const result = await data.save();
        // console.log("xyyyyy",result);
    })
}

// insertAdd = async (clm) => {
//     return new Promise(async(resolve, reject) => {
//         let data = new signupSchema({
//             address: clm.address,
//             hostname: clm.hostname,
//             ip: clm.ip,
//             lastRequestAt: clm.lastRequestAt,
//             lastLogin: moment().format(),
//             sessionID: clm.sessionID
//         });
//         // let data = new signupSchema(req.body);
//         const result = await data.save();
//         resolve("done");
//         // console.log("xyyyyy",result);
//     })
// }

insertAdd = async (clm) => {
    return new Promise(async(resolve, reject) => {
        let data = await signupSchema.create({
            address: clm.address,
            hostname: clm.hostname,
            ip: clm.ip,
            lastRequestAt: clm.lastRequestAt,
            lastLogin: moment().format(),
            sessionID: clm.sessionID
        });
        // let data = new signupSchema(req.body);
        // const result = await data.save();
        resolve("done");
        // console.log("xyyyyy",result);
    })
}


exports.Authlogin = async function (req, res) {
        const clm = {
            address : req.body.address
        }
        const authuser1 ={
            address: req.body.address,
            hostname: "",
            ip: "",
            sessionID: req.session.id,
            lastRequestAt: req.session._lastRequestAt
        };
        const data1 = await login2(clm);
        if(data1.length==0){
            const insAdd = await insertAdd(authuser1);
        }
        const data = await login2(clm);
            const access_token = jwt.sign({
                address: data[0].address
            },
                process.env.JWT_SECRET, {
                expiresIn: "5d"
            });

            let useralldata = data[0];
            data[0].password = "NahiBataunga";

            res.send({
                message: 'Authorized User',
                accessToken: access_token,
                user: useralldata
            })
        // }
        // else{
        //     res.status(480).send({message:"IAddress Not Found"});
        // }
};

// exports.insertAdd = async function (req,res) {
//     console.log("hhhh")
//     let data = new signupSchema(req.body);
//         let result = await data.save();
//         console.log(result);
//         // res.send(result);
//     res.send({
//         message: 'updated',
//         result : result
//     })
// }

// exports.Authlogin = async function (req, res) {
//     if (!Object.keys(req.body).length) {
//         return res.status(200).json({
//             errorcode: '208',
//             message: "Userid and password not Provided",
//         });
//     } else if (!req.body.email || !req.body.password) {
//         let params = [req.body.Email, req.body.Password];
//         let lackingParam = params.findIndex(param => !param === true) > 0 ? params.findIndex(param => !param === true) > 1 ? "" : "Email is empty" : "password is empty"
//         return res.status(200).json({
//             errorcode: '209',
//             message: lackingParam,
//         });
//     }
//     else {
//         // console.log("H22iiii");
//         const clm = {
//             email : req.body.email,
//             pass : req.body.password
//         }
//         const data = await login2(clm);
//         // console.log("good",data[0].email)
//         if(data.length>0){
//             const authuser1 ={
//                 email: req.body.email,
//                 password: req.body.password,
//                 hostname: "",
//                 ip: "",
//                 sessionID: req.session.id,
//                 lastRequestAt: req.session._lastRequestAt
//             };
//             const insAdd = await insertAdd(authuser1);
//             console.log("xx",insAdd)
//             const access_token = jwt.sign({
//                 email: data[0].email,
//                 name: data[0].name,
//                 phone: data[0].phone
//             },
//                 process.env.JWT_SECRET, {
//                 expiresIn: "1d"
//             });

//             let useralldata = data[0];
//             data[0].password = "NahiBataunga";

//             res.send({
//                 message: 'Authorized User',
//                 accessToken: access_token,
//                 user: useralldata
//             })
//         }
//         else{
//             res.status(480).send({message:"Incorrect Password"});
//         }
//     }
// };