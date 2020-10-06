const User = require('../models/user');
var jwt = require('jsonwebtoken');

exports.signup = (req, res) => {

    User.findOne({ email: req.body.email }).exec((err, user) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        if (user) return res.status(400).json({
            message: 'Email already used.'
        })
        const { firstName, lastName, username, email, password } = req.body;
        const _user = new User({
            firstName, lastName, username: Math.random().toString(), email, password
        });

        _user.save((error, data) => {
            if (error) {
                return res.status(400).json({
                    error: error
                })
            }
            if (data) {
                return res.status(201).json({
                    message: 'User created succesfully'
                })
            }
        })
        if (err) {
            console.log(err);
            res.status(500).json({
                err: err
            })
        }
    });
}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email }).exec((err, user) => {
        if (err) return res.status(400).json({ err: err });
        if (user) {
            if (user.role !== 'user') {
                return res.status(400).json({ err: 'This email is tied to an admin account. Please use the Admin Dashboard to login.' });
            }
            if (user.authenticate(req.body.password)) {
                const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
                const { _id, firstName, lastName, email, role, fullName } = user;
                res.status(200).json({
                    token,
                    user: { _id, firstName, lastName, email, role, fullName }
                })
            } else {
                return res.status(400).json({ message: 'Invalid credentials.' })
            }

        } else {
            return res.status(400).json({ message: 'Invalid credentials.' })
        }

    })

}
