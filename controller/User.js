const { User } = require('../model/userSchema')


exports.fetchUsersById = async (req, res) => {
    const { id } = req.params;

    try {
        const userById = await User.findById(id).exec();
        res.status(200).json(userById);

    } catch (error) {
        res.status(400).json(error);
    }

}

// Update the User //
exports.updateUsersById = async (req, res) => {
    const { id } = req.params;
    try {
        const userUpdated = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(userUpdated);
    } catch (error) {
        res.status(400).json(error);
    }

}