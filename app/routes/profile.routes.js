module.exports = app => {
    const profileControler = require("../controllers/profile.controllers")
    const access_token = require("../services/token.services")

    //Edit Profile
    app.put("/editProfile",access_token.authenticateJWT, profileControler.editProfile);

    //Create NFT
    app.post("/createNFT",access_token.authenticateJWT, profileControler.createNFT)

    //update NFT Detail
    app.post("/updateNFTDetail",access_token.authenticateJWT, profileControler.updateNFTDetail)

    //Totle Assets(NFTs) of customer
    app.get("/ttlNFTofcustomer",access_token.authenticateJWT, profileControler.ttlNFTsOfcustomer);
}