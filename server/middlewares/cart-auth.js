const jwt = require('jsonwebtoken');
require('dotenv').config();


const fetchUser = async(req,res,next) => {
    const token = req.header('auth-token');
    if(!token) return  res.status(401).json({msg: 'No Token Provided'});

    const valid = jwt.verify(token,process.env.JWT_SECRET);
    if(!valid) return  res.status(401).json({msg:'Token is not Valid'});

    req.user = valid.id;
    next();

}

module.exports = fetchUser;