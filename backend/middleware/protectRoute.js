import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// Middleware to protect routes by verifying the user's JWT and attaching user information to the request
export const protectRoute = async (req, res, next) => {
    try {
        // Step 1: Extract the JWT token from the request cookies
        const token = req.headers['authorization'].split(" ")[1];
        
        // Step 2: Check if the token exists
        if(!token) {
            return res.status(401).json({
                error: {
                    message: "Unauthorized: No token provided"
                }
            });
        }

         // Step 3: Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Step 4: Check if the token could not be decoded (e.g., invalid or expired)
        if(!decoded) {
            return res.status(401).json({
                error: {
                    message: "Unauthorized: Invalid token"
                }
            });
        }

        // Step 5: Find the user in the database using the userId from the decoded token
        const user = await User.findById(decoded.userId).select("-password");
        
        if(!user) {
            return res.status(404).json({
                error: {
                    message: "User not found"
                }
            });
        }

        // Step 6: Attach the user's information to the `req` object for downstream handlers to use
        req.user = user;
        
        next();

    } catch (error) {
        console.log("Error in protectRoute Middleware: ", error.message);
        return res.status(500).json({
            error: {
                message: "Internal Server Error"
            }
        })
    }
}