const Authtable = require("../models/auth.model.js");
const jwt = require('jsonwebtoken');

const dbConnect = require('../config/db.config')
const moment = require('moment');
const schema = require("../schema/schema.model");
// const authModel = require("../models/auth.model")
const mongodb = require('mongodb');
const signupSchema = schema.signupSchemas;
const NFTprofileDetails = schema.NFTprofileDetails;
const profileModel = require('../models/profile.model')

exports.editProfile = async (req, res) => {

    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    var user = jwt.decode(token, process.env.JWT_SECRET)

    const userDetail = await profileModel.userDetail(user.address);
    if(userDetail[0].username == req.body.username){
        res.send({result : "username already exist"})
    }
    else{
        let result = await signupSchema.updateMany(
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
    }
}


exports.createNFT = async (req, res) => {
    
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    var user = jwt.decode(token, process.env.JWT_SECRET)
    const profileData = await profileModel.findName(user.address)
    // console.log("yyy",profileData)
    // console.log("yddd",profileData[0].name)

    let data = new NFTprofileDetails({
        assetname : req.body.assetname,
        typeofart : req.body.typeofart,
        dimension : req.body.dimension,
        bio : req.body.bio,
        tokenid : req.body.tokenid,
        dateofcreation : req.body.dateofcreation,
        marking : req.body.marking,
        provenance :req.body.provenance,
        evidenceofownership : req.body.evidenceofownership,
        nftimage : req.body.nftimage,
        estimatedvalue : req.body.estimatedvalue,
        blockchain :req.body.blockchain,
        creater: profileData[0].name,
        owner: profileData[0].name,
        address:user.address,
        validationstate: "Not Started",
        homeaddress:profileData[0].homeaddress,
        city:profileData[0].city
    });
        let result = await data.save();
        console.log(result);
        res.send(result);
}


exports.updateNFTDetail = async (req, res) => {
    let result = await NFTprofileDetails.updateOne(
        {address : req.body.address},
        {$set : req.body}
    )
    
    res.send({result : "updated"})
}


exports.ttlNFTsOfcustomer = async (req, res) => {
    let data = await NFTprofileDetails.find({owner:req.body.owner});
    res.send(data);
}