const { User } = require("../model/userSchema");
const crypto = require("crypto");
const { sanitizeUser, SECRET_KEY } = require("../services/common");
const jwt = require("jsonwebtoken");

// Creating the Users //
exports.createUser = async (req, res) => {

    try {

        var salt = crypto.randomBytes(16);
        crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async function (err, hashedPassword) {

            const user = new User({ ...req.body, password: hashedPassword, salt })
            const savedUser = await user.save();

            req.login(sanitizeUser(savedUser), (err) => { // req.login also calls serializer and adds to the session //
                if (err) {
                    res.status(400).json(err)
                }
                else {
                    const token = jwt.sign(sanitizeUser(savedUser), SECRET_KEY)

                    res.cookie('jwt', token, { expires: new Date(Date.now() + 3600000), httpOnly: true }).status(201).json(token);
                }
            })

        })
    } catch (error) {
        res.status(400).json(error);
    }

}

exports.loginUser = async (req, res) => {
    res.cookie('jwt', req.user.token, { expires: new Date(Date.now() + 3600000), httpOnly: true }).status(201).json(req.user.token);
}


exports.checkUser = async (req, res) => {
    // Now you can access the authenticated user using req.user
    if (req.user) {
        res.status(201).json({ status: 'success', user: req.user });
    } else {
        res.status(400).json({ status: 'error', message: 'User not authenticated' });
    }
}