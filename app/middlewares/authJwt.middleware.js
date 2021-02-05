const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided, access unauthorized !"
        });
    }

    jwt.verify(token, process.env.BACKEND_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized !"
            });
        }
        req.player = decoded;
        next();
    });
};

module.exports = {
    verifyToken
}