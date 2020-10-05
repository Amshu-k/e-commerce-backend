const express = require('express');
const { signup, signin, requireSignIn } = require('../../controller/admin/auth');
const { isRequestValid, ValidateSignUpRequest, ValidateSignInRequest } = require('../../validators/auth');
const router = express.Router();

router.post('/admin/signin', ValidateSignInRequest, isRequestValid, signin);
router.post('/admin/signup', ValidateSignUpRequest, isRequestValid, signup);

module.exports = router