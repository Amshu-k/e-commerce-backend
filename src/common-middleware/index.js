var jwt = require('jsonwebtoken');

exports.requireSignin = exports.requireSignIn = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(400).json({ message: 'You\'re not authorization.' })
    }
    const decodedUser = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY);
    req.user = decodedUser;
    next();
}

exports.userMiddleware = (req, res, next) => {

}

exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(400).json({ message: 'Access denied. Please check your privileges.' })
    }
    next();
}