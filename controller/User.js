const { User } = require('../model/userSchema')


exports.fetchUsersById = async (req, res) => {
    const { id } = req.user;

    try {
        const userById = await User.findById(id).select('email id role addresses username').exec();
        res.status(200).json(userById);

    } catch (error) {
        res.status(400).json(error);
    }

}

// Update the User //
exports.updateUsersById = async (req, res) => {
    const { id } = req.user;
    try {
        const userUpdated = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(userUpdated);
    } catch (error) {
        res.status(400).json(error);
    }

}