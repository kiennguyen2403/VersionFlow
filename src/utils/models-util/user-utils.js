import User from "../../model/user";

export const createUser = async (name, email, password) => {
    const user = new User({
        name,
        email,
        password,
    });
    await user.save();
};


export const getUser = async (req, res) => {
    return await User.find();
};

export const getUserById = async (req, res) => {
    return await User.findById(req.params.id);
};

