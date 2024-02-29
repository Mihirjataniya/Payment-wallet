const jwt = require("jsonwebtoken")

const authMiddlewear = (req,res,next) => {
const authHeader = req.headers.authorization;

if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({});
}

const token = authHeader.split(' ')[1];

try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user_Id = decoded.user_Id;
    next()
} catch (err) {
    return res.status(403).json({});
}

};


module.exports = {
    authMiddlewear
}
