module.exports = function(app) {
    app.get('/api/users', function (req, res) {
        db.users(res);
    });
    app.get('/api/user', function (req, res) {
        db.user(req,res);
    });
    app.get('/api/adverts', function (req, res) {
        db.adverts(res);
    });

    app.get('/api/advert', function (req, res) {
        db.advert(req,res);
    });
};