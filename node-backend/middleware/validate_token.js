const jwt = require('jsonwebtoken');
const { findUser } = require('../controllers/user_controller')


const validate_token = async function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await findUser(data.id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        user.role = data.role;
        req.user = user;

        next();
    } catch (error) {
        return res.status(401).send('Not authenticated to access this resource');
    }
};
module.exports = validate_token