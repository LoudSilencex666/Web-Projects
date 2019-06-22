module.exports = function(req, res, next) {
    if (req.url === '/adminpanel' && (!req.session || !req.session.authenticated)) {
      res.render('unauthorised', { status: 403 });
      return;
    }
    next();  
}