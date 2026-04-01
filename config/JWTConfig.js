const jwt = require('jsonwebtoken')

const expiry = "1h";
const secret = "bdc5e2b2-9563-4398-874a-7e5e68276750";

function generateToken(user)   // ✅ parameter change
{
    const token = jwt.sign(
        {
            id: user.id,       // ✅ now valid
            email: user.email,
            role: user.role 
        },
        secret,
        { expiresIn: expiry }
    );  

    return token;    
}

function verifyToken(token, callback)
{
    jwt.verify(token, secret, (err, tokenData) => {
        if (err)
            callback(err, null);
        else
            callback(null, tokenData)
    })
}

module.exports = { generateToken, verifyToken }
