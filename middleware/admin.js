
module.exports = function (req, res, next) {
    //check if user is an admin
    if(!req.user.isAdmin) return res.status(403).send('Access Denied');

    next();
}