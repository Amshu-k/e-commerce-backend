
const { check } = require('express-validator');
const { validationResult } = require('express-validator');

exports.ValidateSignUpRequest = [
    check('password')
        .isLength({ min: 5 }).withMessage('must be at least 6 chars long'),
    // .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/).withMessage('Must contain atleat one digit, one lowercase, one uppercase and have a length of at least 8 characters.'),
    check('firstName')
        .notEmpty()
        .withMessage('First name is required.'),
    check('lastName')
        .notEmpty()
        .withMessage('Last name is required.'),
    check('email')
        .notEmpty()
        .withMessage('Email is required.')
        .isEmail()
        .withMessage('Valid email is required.')
];

exports.ValidateSignInRequest = [
    check('email')
        .notEmpty()
        .withMessage('Email is required.')
        .isEmail()
        .withMessage('Valid email is required.')
];

exports.isRequestValid = (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).json({errors: validationErrors.array()})
    }
    next();
}