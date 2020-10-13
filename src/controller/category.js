const Category = require('../models/category');
const slugify = require('slugify');

function createCategoriesRecursively(categories, parentId = null) {

    const categoryList = []
    let category;
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == null)
    } else {
        category = categories.filter(cat => cat.parentId == parentId)
    }
    for (let c of category) {
        categoryList.push({
            _id: c._id,
            name: c.name,
            slug: c.slug,
            children: createCategoriesRecursively(categories, c._id)
        });
    }
    return categoryList;
}

exports.createCategory = (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name),
    }
    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId
    }
    const category = new Category(categoryObj);
    category.save((error, category) => {
        if (error) return res.status(400).json({ error })
        if (category) return res.status(201).json({ category })
    })
}

exports.getCategories = (req, res) => {
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

