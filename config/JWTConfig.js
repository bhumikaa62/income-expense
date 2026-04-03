require("dotenv").config();

const jwt = require('jsonwebtoken');

const expiry = process.env.JWT_EXPIRES_IN || "1h";
const secret = process.env.JWT_SECRET;

if (!secret) {
    throw new Error("JWT_SECRET is not defined in .env");
}

function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        secret,
        { expiresIn: expiry }
    );
}

function verifyToken(token, callback) {
    jwt.verify(token, secret, (err, tokenData) => {
        if (err) return callback(err, null);
        return callback(null, tokenData);
    });
}

module.exports = { generateToken, verifyToken };