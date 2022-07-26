module.exports = app => {
    const auth = require("../controllers/auth.controllers")
    const access_token = require("../services/token.services")
    // signup
    app.post('/auth/signup',auth.signup);

    //Application login
    app.post("/auth/login", auth.Authlogin);

    //Inster Address
    // app.post("/insertAdd", auth.insertAdd);

    app.get("/auth/get",access_token.authenticateJWT, auth.getdata);
}