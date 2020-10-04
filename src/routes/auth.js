const express = require('express');
const { signup, signin, requireSignIn } = require('../controller/admin/auth');
const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);

// router.get('/prachi', requireSignIn, (req, res) => {
//     console.log(req)
//     res.status(200).json({
//         hello: "hello"
//     })
// })

module.exports = router