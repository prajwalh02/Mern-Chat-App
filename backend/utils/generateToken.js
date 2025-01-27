import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,  // 15 days in milliseconds
        httpOnly: true,                   // Prevents the cookie from being accessed via JavaScript (enhances security)
        sameSite: "strict",               // Ensures the cookie is only sent to the same site
        secure: process.env.NODE_ENV !== "development", // Ensures the cookie is sent over HTTPS in production
    });
    
}


export default generateTokenAndSetCookie;