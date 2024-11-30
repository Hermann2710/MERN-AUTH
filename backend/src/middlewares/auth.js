const { verifyToken } = require("../utils/jwt");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
    // Verify authentication
    const { authorization } = req.headers;

    if(!authorization) {
        res.status(401).json({error: "Authorisation token required"});
    }

    const token = authorization.split(' ')[1];

    try {
        const { _id } = verifyToken(token);

        req.user = await User.findOne({ _id: _id}).select('_id');
        next();
    } catch (error) {
        res.status(401).json({error: "Request is not authorized"})
    }
}

module.exports = authMiddleware;