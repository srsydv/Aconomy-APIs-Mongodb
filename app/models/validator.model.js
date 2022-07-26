const schema = require("../schema/schema.model");
const signupSchema = schema.signupSchemas;
const NFTprofileDetails = schema.NFTprofileDetails;
const signupValidatorSchemas = schema.signupValidatorSchemas;
const NFTValidation = schema.NFTValidations

detailsOfUser = async (address) => {
    return new Promise(async(resolve, reject) => {
        console.log("Hi3");
        let data = await signupSchema.find({address:address});
        // console.log("Hi4",data.length);
        if (data) {
            resolve(data);
        } else {
            reject("error");
        }
    })
}

NFTdetails = async (clm) => {
    return new Promise(async(resolve, reject) => {
        let data = await NFTprofileDetails.find({tokenid:clm.tokenid,assetname:clm.assetname});
        // console.log("Hi4",data.length);
        if (data) {
            resolve(data);
        } else {
            reject("Error");
        }
    })
}

validatorDetail = async (address) => {
    return new Promise(async(resolve, reject) => {
        let data = await signupValidatorSchemas.find({address:address});
        // console.log("Hi4",data.length);
        if (data) {
            resolve(data);
        } else {
            reject("Error");
        }
    })
}

NFTdetailsForValidation = async (validatorusername) => {
    return new Promise(async(resolve, reject) => {
        let data = await NFTValidation.find({validatorusername : validatorusername});
        if (data) {
            resolve(data);
        } else {
            reject("Error");
        }
    })
}


module.exports = {
    detailsOfUser,
    NFTdetails,
    validatorDetail,
    NFTdetailsForValidation
}