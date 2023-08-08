const { User } = require("../model/userSchema");
const crypto = require("crypto");

// Creating the Users //
exports.createUser = async (req, res) => {

    try {

        var salt = crypto.randomBytes(16);
        crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256',async function (err, hashedPassword) {


            const user = new User({ ...req.body, password: hashedPassword, salt })
            const savedUser = await user.save();
            res.status(201).json(savedUser);

        })
    } catch (error) {
        res.status(400).json(error);
    }

}

exports.loginUser = async (req, res) => {

    res.json(req.user);
}


exports.checkUser = async (req, res) => {
    console.log(req.user);
    const responseObj = {
        user: req.user,
        msg: 'user is checked'
    };

    res.json(responseObj);
    console.log('chal rha hau');
}
