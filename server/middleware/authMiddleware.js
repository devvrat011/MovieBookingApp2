const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    try {
        const authHeader = String(req.headers['token']);
        if (!authHeader) {
            return res.status(401).json({ "error": "Please use a valid authentication token" });
        }

        const secret = process.env.JWT_SECRET;
        const token_verification = jwt.verify(authHeader, secret);
        req.user = token_verification;
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Internal Server error occured" });
    }
    next();
}

module.exports = authenticate;