module.exports = app => {
    const dashboard = require("../controllers/dashboard.controllers")
    const access_token = require("../services/token.services")

    //Price Range
    app.get("/PriceRange",access_token.authenticateJWT, dashboard.PriceRange);
}