const express = require('express');
const { requireSignIn, adminMiddleware } = require('../common-middleware');
const { createProduct, getProducts } = require('../controller/product');
const multer = require('multer');
const shortid = require('shortid')
const router = express.Router();
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage })


router.post('/product/create', requireSignIn, adminMiddleware, upload.array('productImage'), createProduct);
router.get('/products', getProducts)
module.exports = router;