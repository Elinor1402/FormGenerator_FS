function authorize_token(...allowedRoles) {
    try {
        return (req, res, next) => {
            // `user` should be attached to `req` by the `passport.authenticate` middleware
            if (!req.user) {
                return res.status(403).send("User not found");
            }
            // Check if the user's role is allowed
            const userRole = req.user.role; // Assume user object has a 'role' field
            if (!allowedRoles.includes(userRole)) {
                return res.status(403).send("Forbidden");
            }
            next(); // User is authorized, proceed to the next middleware or route handler
        };

    } catch (error) {
        return res.status(401).send("Not authorized to access this resource")
    }
};
module.exports = authorize_token