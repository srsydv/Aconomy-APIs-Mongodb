
const jwt = require('jsonwebtoken');
const dbConnect = require('../config/db.config')
const moment = require('moment');
const schema = require("../schema/schema.model");
const validatorModel = require('../models/validator.model')

const mongodb = require('mongodb');
// const signupSchema = schema.signupSchemaex;
const signupValidatorSchemas = schema.signupValidatorSchemas;
const NFTprofileDetails = schema.NFTprofileDetails;
const NFTValidation = schema.NFTValidations



exports.validatorProfile = async (req, res) => {
    let data = await signupValidatorSchemas.find({},{name:2, phone:1, homeaddress : 1, profilepic:1});
    res.json(data)
}

exports.validatorEditProfile = async (req, res) => {

    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    var user = jwt.decode(token, process.env.JWT_SECRET)

    const validatorDetail = await validatorModel.validatorDetail(user.address);
    // if(validatorDetail[0].username == req.body.username){
    //     res.send({result : "username already exist"})
    // }
    // else{
        let result = await signupValidatorSchemas.updateMany(
            {address : user.address},
            {$set : 
                {
                    name:req.body.name,
                    username:req.body.username,
                    bio:req.body.bio,
                    profilepic:req.body.profilepic,
                    profilebanner:req.body.profilebanner,
                    homeaddress:req.body.homeaddress,
                    city:req.body.city,
                    email:req.body.email,
                    phone:req.body.phone,
                    twitter:req.body.twitter,
                    facebook:req.body.facebook,
                    instagram:req.body.instagram,
                    websiteurl:req.body.websiteurl
                }
            }
        )
        
        res.send({result : "updated"})
    // }
}

login2 = async (clm) => {
    return new Promise(async(resolve, reject) => {
        let data = await signupValidatorSchemas.find({address:clm.address});
        if (data) {
            resolve(data);
        } else {
            reject("Error");
        }
    })
}

insertAdd = async (clm) => {
    return new Promise(async(resolve, reject) => {
        let data = new signupValidatorSchemas({
            address: clm.address,
            hostname: clm.hostname,
            IP: clm.ip,
            lastRequestAt: clm.lastRequestAt,
            lastLogin: moment().format(),
            sessionID: clm.sessionID
        });
        const result = await data.save();
        resolve("done");
    })
}


exports.validatorlogin = async function (req, res) {
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
        console.log("good11",data) 
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
};


exports.NFTforValidation = async function (req, res) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    var user = jwt.decode(token, process.env.JWT_SECRET)
    const detailsOfUser = await validatorModel.detailsOfUser(user.address)
    const clm = {
        tokenid : req.body.tokenid,
        assetname : req.body.assetname
    }
    const NFTdetails = await validatorModel.NFTdetails(clm);
    let data = new NFTValidation({
        assetname : req.body.assetname,
        tokenid : req.body.tokenid,
        owner : NFTdetails[0].owner,
        creater: NFTdetails[0].creater,
        address:user.address,
        validationstate: "pending",
        city: detailsOfUser[0].city,
        homeaddress: detailsOfUser[0].homeaddress,
        estimatedvalue: NFTdetails[0].estimatedvalue,
        validatornameforvld: req.body.validatornameforvld,
        validatorusernameforvld: req.body.validatorusernameforvld,
        nftimage: NFTdetails[0].nftimage
    });
    let result2 = await NFTprofileDetails.updateMany(
        {tokenid : req.body.tokenid,
        assetname : req.body.assetname},
        {$set : 
            {
                validationstate:"pending",
            }
        }
    )
        let result = await data.save();
        console.log(result);
        res.send(result);
}

exports.getAllNFTs = async (req, res) => {
    let data = await NFTValidation.find();
    res.json(data)
}

exports.getNFTForValidation = async (req, res) => {
    let data = await NFTValidation.find({tokenid:req.body.tokenid,assetname:req.body.assetname});
    res.json(data)
}


exports.validatateNFT = async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    var user = jwt.decode(token, process.env.JWT_SECRET)

    const validatorDetail = await validatorModel.validatorDetail(user.address);

    let result = await NFTValidation.updateMany(
        {tokenid : req.body.tokenid,
        assetname : req.body.assetname},
        {$set : 
            {
                validationstate:"Validated",
                validatorname: validatorDetail[0].name,
                validatorusername: validatorDetail[0].username,
                validatorwltaddress: user.address
            }
        }
    )

    let result2 = await NFTprofileDetails.updateMany(
        {tokenid : req.body.tokenid,
        assetname : req.body.assetname},
        {$set : 
            {
                validationstate:"Validated",
                validatorname: validatorDetail[0].name,
                validatorusername: validatorDetail[0].username,
                validatorwltaddress: user.address
            }
        }
    )
    
    res.send({result : "Validated"})
}


exports.RequestforValidation = async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    var user = jwt.decode(token, process.env.JWT_SECRET)
    const validatorDetail = await validatorModel.validatorDetail(user.address);
    let data = await NFTValidation.find(
        {
        validatorusernameforvld : validatorDetail[0].username,
        validationstate: "pending"
    });
    res.send(data);

}



exports.MyValidatedNFT = async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    var user = jwt.decode(token, process.env.JWT_SECRET)
    const validatorDetail = await validatorModel.validatorDetail(user.address);
    let data = await NFTValidation.find(
        {
        validatorusernameforvld : validatorDetail[0].username,
        validationstate: "Validated",
    });
    res.send(data);

}
