const jwt = require('jsonwebtoken')
const createError = require('http-errors')
// const sql = require('mssql');
// const config = require("../config/db.config.js")
const config = require('../config/db.config')
const moment = require('moment');
const Authtable = require("../models/auth.model.js");
const schema = require("../schema/schema.model");
const login_logs_schema = schema.login_logs_schemaex;


get_login_logs = async (clm) => {
    return new Promise(async(resolve, reject) => {
        let data = await login_logs_schema.find({email:clm.email});
    // let result = await data.insert(req.body)
    resolve(data)
    // console.log("ddd",data);
    })
}

UpdateLoginLogs = async (email) => {
    return new Promise(async(resolve, reject) => {

        let data =await  login_logs_schema.updateOne(
            { email: email },
            {
                $set: { loginTime: moment().format() }
            }
        )
        console.log(data)
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
        console.log(result);
    })
}


const authenticateJWT = async (req, res, next) => {
    // let pool = await sql.connect(config);
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
            if (err) res.status(450).send({message:"Session Expired"})
            else{  
                console.log("paylode",payload)
                // const Email = payload.email;
                // const sessionid = req.session.id;
                // const timeToExpireSession = req.session.cookie.originalMaxAge - req.session.cookie.maxAge 
                // console.log("gggg",timeToExpireSession)
                // console.log("gggg",req.session.cookie)
                // console.log("gggg",req.session.cookie.maxAge)
                // if(timeToExpireSession>=2400000 && timeToExpireSession<=3600000 ){
                    // if(timeToExpireSession>=1 ){
                    // console.log("jjjjjjj")
                    // req.session.destroy(function(err) {
                    //     // cannot access session here
                    //     console.log(err);
                    //   })
                    // req.session.regenerate(function(err) {
                    //     console.log(err);
                    // })

                        const authuser1 = {
                            email: payload.email,
                            hostname: "",
                            ip: "",
                            sessionID : req.session.id,
                            lastRequestAt:req.session._lastRequestAt
                          };

                        // will have a new session here
                       
                        // const checksession = "SELECT TOP (1) [Email],[IP],[hostName],[lastRequestAt],[loginTime],[logoutTime],[sessionId] FROM [product].[dbo].[login_logs] where Email='"+Email+"' and logoutTime is null order by loginTime desc"
                      const getData = await get_login_logs(authuser1);
                      console.log("hhh",getData);
                      if(getData.length == 0){
                        res.status(480).send({message:"You are Disabled"})
                      }
                      else{
                          next();
                          await Authtable.UpdateLoginLogsAgain(authuser1)
                      }
                        // req.session.login({email: req.body.email})
                        //         .then(() => {
                        //           authuser1.ip = req.session._ip;
                        //           authuser1.hostname= req.session._ua
                        
                        //           console.log("eeeeeeeeeee");
                        //           UpdateLoginLogsAgain(authuser1, (err, data) => {
                        //             next();
                        //           });
                        //         });
                    //   }
                        // await pool.request().query(checksession, async (err, result) => {
                        //     // console.log(result)
                        //   if (err) {
                        //     console.log("err: ", err);
                        //     return;
                        //   }
                        //   else if (result.recordset.length === 0){
                        //         res.status(480).send({message:"You are Disabled"})
                        //   } 
                        //   else{
                        //     await pool.request().query("update login_logs set logoutTime ='"+moment().format()+"'where id ='"+result.recordset.Email+"'" , (err, result) => {
                        //         // console.log(result)
                        //       if (err) {
                        //         console.log("err: ", err);
                        //         return;
                        //       }
                        //       else{
                        //         req.session.login({Email: req.body.Email})
                        //         .then(() => {
                        //           authuser1.ip = req.session._ip;
                        //           authuser1.hostname= req.session._ua
                        
                        //           Authtable.UpdateLoginLogs(authuser1, (err, data) => {
                        //             console.log(err);
                        //             next();
                        //           });
                        //         });
                                  
                               
                        //       }
            
                        //     });
                            
                        //   }
        
                        // });
                     
                // }
                // else {
                //     console.log("nooooo")
                // const checksession = "SELECT TOP (1) [Email],[IP],[hostName],[lastRequestAt],[loginTime],[logoutTime],[sessionId] FROM [product].[dbo].[login_logs] where Email='"+Email+"' and logoutTime is null order by loginTime desc"
                      
                // // let pool = await sql.connect(config);
                // await pool.request().query(checksession, (err, result) => {
                //     // console.log(result)
                //   if (err) {
                //     console.log("err: ", err);
                //     return;
                //   }
                //   else if (result.recordset.length === 0){
                //         res.status(480).send({err:"You are Disabled"})
                //   } 
                //   else{
                //     next();
                //     // if(result.recordset[0].sessionId == sessionid ){
                //     //     next();
                //     //   }
                //     //   else{
                //     //     res.status(460).send({err:"You are login somewhere else"})
                //     //   }
                //   }

                // });

            // }

            }
        });
    } else{
        res.status(401).send({"result":"Token not provided"})
      }
};

const dataFromToken = (token,result) => {
        // console.log("datafro tokr",token)
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                if (err.name === 'JsonWebTokenError') {
                   console.log(err.name)
                } else {
                  console.log(err.name)
                }
            }
            else{
            result(null,payload)
            }
        });
   
};


const verifyRefreshToken = (req, res, next) => {
    const token = req.body.token;

    if (authHeader) {

        jwt.verify(token, process.env.REFRESH_SECRET, (err, payload) => {
            if (err) {
                if (err.name === 'JsonWebTokenError') {
                    return next(createError.Unauthorized())
                } else {

                    return next(createError.Unauthorized(err.message))
                }
            }
            req.payload = payload
            
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = {
    authenticateJWT,
    dataFromToken
}