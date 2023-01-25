
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { getPostData, throwError, headers } = require('../utils/utils');

exports.SignUp = async (req, res) => {
    const body = JSON.parse(await getPostData(req));
    const { email  } = body;

    User.findOne({ email }).exec((err, user) => {
        if (user) {
            throwError(res, 'Email is taken');
        } else {
            const newUser = new User(body);
            newUser.save((err, user) => {
                if (err) {
                    throwError(res, err);
                } else {
                    res.writeHead(200, headers);
                    res.write(JSON.stringify({ message: 'User signed up successfully' }));
                    res.end();
            }});
        }
    });
};

exports.SignIn = async (req, res) => {
    const body = JSON.parse(await getPostData(req));
    const { email, password } = body;
    User.findOne
        ({ email }).exec((err, user) => {
            if (err || !user) {
                throwError(res, 'User with that email does not exist. Please signup');
            }
            if (!user.authenticate(password)) {
                throwError(res, 'Email and password do not match');
            }
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.writeHead(200, headers);
            user.encryptPassword = undefined;
            user.salt = undefined;
            res.write(JSON.stringify({ token, user }));
            res.end();
        }
        );
};