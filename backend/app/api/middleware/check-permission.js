const jwt = require('jsonwebtoken');

const USER = 1;
const SYSTEM = 9998;
const ADMIN = 9999;

function permissions(permission) {
    return (req,res, next) =>{
    var role = -1;
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        switch(decoded.role){
            case "user":
                role = USER;
                break;
            case "admin":
                role = ADMIN;
                break;
            case "system":
                role = SYSTEM;
                break;
            default:
                role = USER;
        }
        if(role >= permission){
        next();
        }else{
            return res.status(403).json({
                message: 'Permission denied'
            });
        }
    } catch (error) {
        return res.status(403).json({
            message: 'Permission denied'
        });
    }
}
};

module.exports.permissions = permissions
module.exports.USER = USER;
module.exports.SYSTEM = SYSTEM;
module.exports.ADMIN = ADMIN;