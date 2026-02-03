const jwt = require('jsonwebtoken')


const expiry = "10m";
const secret = "bdc5e2b2-9563-4398-874a-7e5e68276750";

function generateToken(email)
{
    const token = jwt.sign({email},secret,{ expiresIn: expiry });  
    return token;    
}

function verifyToken(token,callback)
{
    jwt.verify(token,secret,(err,tokenData)=>
        {
            if(err)
                callback(err,null);
            else
            {
                callback(null,tokenData)
            }
        })
}

module.exports = {generateToken,verifyToken}