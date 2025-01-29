import User from "../models/user.model.js";


export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        const filteredUsers = await User.find({_id: { $ne: loggedInUser }}).select("-password");  // except curr loggedin user we want all the user

        return res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Error in getUserForSidebar: ", error);
        return res.status(500).json({error: "Internal Server Error"});
    }
}