const Product = require('../models/product');
const slugify = require('slugify');

exports.createProduct = (req, res) => {
    const { name, price, description, quantity, category } = req.body
    let productPictures = [];
    if (req.files.length) {
        productPictures = req.files.map(file => {
            return { img: file.filename }
        })
    }

    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        description,
        productPictures,
        category,
        quantity,
        createdBy: req.user._id
    });
    console.log(product);
    product.save(((error, product) => {
        if (error) {
            return res.status(400).json({ error });
        }
        if (product) {
            return res.status(201).json({ product });
        }
    }))
}

exports.getProducts = (req, res) => {
    Category.find({}).exec((err, categories) => {
        if (err) {
            return res.status(400).json({ err })
        }
        if (categories) {
            const categoryList = createCategoriesRecursively(categories);
            res.status(200).json({ categoryList })
        }

    })
}

