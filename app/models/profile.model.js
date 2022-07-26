const schema = require("../schema/schema.model");
const signupSchema = schema.signupSchemas;

findName = async (address) => {
    return new Promise(async(resolve, reject) => {
        console.log("Hi3");
        let data = await signupSchema.find({address:address});
        // console.log("Hi4",data.length);
        if (data) {
            resolve(data);
        } else {
            reject("Error");
        }
    })
}

userDetail = async (address) => {
    return new Promise(async(resolve, reject) => {
        console.log("ccxx",address)
        let data = await signupSchema.find({address:address});
        // console.log("Hi4",data.length);
        if (data) {
            resolve(data);
        } else {
            reject("Error");
        }
    })
}


module.exports = {
    findName,
    userDetail
}
