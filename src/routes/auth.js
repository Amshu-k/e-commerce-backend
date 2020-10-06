const express = require('express');
const { signup, signin } = require('../controller/auth');
const { ValidateSignUpRequest, isRequestValid, ValidateSignInRequest } = require('../validators/auth');
const router = express.Router();

router.post('/signin', ValidateSignInRequest, isRequestValid, signin);
router.post('/signup', ValidateSignUpRequest, isRequestValid, signup);

module.exports = router