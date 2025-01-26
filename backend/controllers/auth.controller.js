import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signupUser = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        // Validate input
        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({
                error: "All fields are required",
            });
        }

        if(!["male", "female"].includes(gender)) {
            return res.status(400).json({
                error: "Gender must be 'male' or 'female'",
            });
        }

        if(password !== confirmPassword) {
            return res.status(400).json({
                error: "Password Do not match"
            })
        }
        
        // check if user exists
        const user = await User.findOne({username});

        if(user) {
            return res.status(400).json({
                error: "Username already exists"
            })
        }

        // Hash the  password 
        const hashedPassword = await bcrypt.hash("password", 10);

        // https://avatar-placeholder.iran.liara.run/ -> profile pic/avatar
        const profilePic = `https://avatar.iran.liara.run/public/${gender == "male" ? "boy" : "girl"}?username=${username}`;
        
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword, 
            gender,
            profilePic,
        });

        if(newUser) {
            // Generate JWT token here
            await generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
                gender: newUser.gender,
            })
        } else {
            return res.status(400).json({
                error: "Invalid User data"
            });
        }

    } catch (error) {
        console.log("Error in sign up controller", error.message);
        return res.status(500).json({
            error: "Internal server error",
        })
    }
    
}

export const loginUser = async(req, res) => {
    try {
        const {username, password } = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect) {
            return res.status(400).json({
                error: "Invalid username or password"
            })
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });

    } catch (error) {
        console.log("Error in sign up controller", error.message);
        return res.status(500).json({
            error: "Internal server error",
        })
    }
    
}

export const logoutUser = (req, res) => {
    res.send("Logout User")
    console.log("Logout");
    
}
