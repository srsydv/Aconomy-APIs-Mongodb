module.exports = app => {
    const validatorControler = require("../controllers/validator.controllers")
    const access_token = require("../services/token.services")

    //validator login
    app.post("/validatorlogin", validatorControler.validatorlogin);

    //Validator Edit Profile
    app.put("/EditvalidatorProfile",access_token.authenticateJWT, validatorControler.validatorEditProfile);

    //All Validator Profile
    app.get("/validatorProfile",access_token.authenticateJWT, validatorControler.validatorProfile);

    //send NFT for validation
    app.post("/NFTforValidation",access_token.authenticateJWT, validatorControler.NFTforValidation)

    //Get All NFTs
    app.get("/getAllNFTs",access_token.authenticateJWT, validatorControler.getAllNFTs);

    //Get NFT by name and tokenId for Validation
    app.get("/getNFTForValidation",access_token.authenticateJWT, validatorControler.getNFTForValidation);

    //Validate NFT
    app.put("/validateNFT",access_token.authenticateJWT, validatorControler.validatateNFT);

    //All Requests for Validation for validator
    app.get("/RequestforValidation",access_token.authenticateJWT, validatorControler.RequestforValidation);

    //Validated NFTs by single validator
    app.get("/MyValidatedNFT",access_token.authenticateJWT, validatorControler.MyValidatedNFT);

    //Favourite NFTs of Validator
    // app.post("/FavouriteNFTsofValidator",access_token.authenticateJWT, validatorControler.FavouriteNFTsofValidator)

}