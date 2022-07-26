const mongoose = require('mongoose');
const signupSchema = mongoose.Schema({
    address:String,
    wltaddress:String,
    name:String,
    username:String,
    profilepic:String,
    profilebanner:String,
    homeaddress:String,
    bio:String,
    email:String,
    password:String,
    lastLogin:String,
    phone:Number,
    city:String,
    twitter:String,
    facebook:String,
    instagram:String,
    websiteurl:String,
    hostname:String,
    ip:String,
    sessionID:String,
    lastRequestAt:String
});

const NFTprofileDetail = mongoose.Schema({
    assetname:String,
    typeofart:String,
    dimension:String,
    bio:String,
    dateofcreation:String,
    marking:String,
    provenance:String,
    evidenceofownership:String,
    nftimage:String,
    estimatedvalue:String,
    blockchain:String,
    nftassetid:String,
    tokenid:String,
    owner:String,
    creater:String,
    validatorname:String,
    validatorusername:String,
    validatorwltaddress:String,
    validationstate:String,
    dob:String,
    tokenid:String,
    creater:String,
    owner:String,
    address:String,
    validationstate:String,
    homeaddress:String,
    city:String
})

const login_logs_schema = mongoose.Schema({
    hostName:String,
    email:String,
    password:String,
    lastLogin:String,
    lastRequestAt:Number,
    loginTime:String,
    logoutTime:String,
    sessionID:String,
    address:String
});

const signupValidatorSchema = mongoose.Schema({
    address:String,
    wltaddress:String,
    name:String,
    username:String,
    profilepic:String,
    profilebanner:String,
    homeaddress:String,
    bio:String,
    email:String,
    password:String,
    lastLogin:String,
    phone:Number,
    city:String,
    twitter:String,
    facebook:String,
    instagram:String,
    websiteurl:String,
    hostname:String,
    ip:String,
    sessionID:String,
    lastRequestAt:String,
    validationrequests:String
});
const NFTValidation = mongoose.Schema({
    assetname:String,
    tokenid:String,
    creater:String,
    owner:String,
    address:String,
    validationstate:String,
    city:String,
    homeaddress:String,
    estimatedvalue:String,
    validatorname:String,
    validatorusername:String,
    validatornameforvld:String,
    validatorusernameforvld:String,
    validatorwltaddress:String,
    nftimage:String
})


const signupSchemas = mongoose.model("signups",signupSchema);
const login_logs_schemaex = mongoose.model("login_logs",login_logs_schema);
const NFTprofileDetails = mongoose.model("NFTprofileDetail",NFTprofileDetail);
const signupValidatorSchemas = mongoose.model("signupvalidator",signupValidatorSchema);
const NFTValidations = mongoose.model("NFTValidation",NFTValidation);
module.exports = {
    signupSchemas,
    login_logs_schemaex,
    NFTprofileDetails,
    signupValidatorSchemas,
    NFTValidations,
}