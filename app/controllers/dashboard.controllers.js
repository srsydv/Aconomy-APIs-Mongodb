const jwt = require('jsonwebtoken');
const dbConnect = require('../config/db.config')
const moment = require('moment');
const schema = require("../schema/schema.model");
const validatorModel = require('../models/validator.model')

const mongodb = require('mongodb');
const signupSchema = schema.signupSchemaex;
const signupValidatorSchemas = schema.signupValidatorSchemas;
const NFTprofileDetails = schema.NFTprofileDetails;
const NFTValidation = schema.NFTValidations

exports.PriceRange = async (req, res) => {
    let data = await NFTprofileDetails.find({estimatedvalue: {$gte:req.body.to, $lte:req.body.from}});
    res.json(data)
}