const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/users/login');
    }
}

module.exports = helpers;