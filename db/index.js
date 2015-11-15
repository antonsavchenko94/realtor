var mysql = require('mysql');

var connection  = mysql.createConnection({
        host        :   'sql4.freemysqlhosting.net',
        user        :   'sql496545',
        password    :   'c2HXNikVMn',
        database    :   'sql496545'
    });
//connection.query('select * from user', function(err, rows, fields){
//    if(err) throw err;
//    console.log("user name = ", rows[0].first_name);
//    exports.json = JSON.stringify(rows);
//});
module.exports = {
    users: function (res) {
        var query = connection.query('select * from user', function (err, rows, fields) {
            if (err) throw err;
            res.send(JSON.stringify(rows));
        });
    },
    user:function (req, res) {
        console.log(req.param("email"));
        if(req.param("id")){
            var query = connection.query('select * from user where user_id ='+req.param("id"), function (err, rows, fields) {
                if (err) throw err;
                res.send(JSON.stringify(rows));
            });
        }
        if(req.param("email")){
            var query = connection.query('select * from user where email ='+req.param("email"), function (err, rows, fields) {
                if (err) throw err;
                res.send(JSON.stringify(rows));
            });
        }
    },
    adverts: function (res) {
        var query = connection.query('select * from advert', function (err, rows, fields) {
            if (err) throw err;
            res.send(JSON.stringify(rows));
        })
    },
    advert:function (req, res) {
        console.log(req.param("id"));
        if(req.param("id")){
            var query = connection.query('select * from advert where advert_id ='+req.param("id"), function (err, rows, fields) {
                if (err) throw err;
                res.send(JSON.stringify(rows));
            });
        }
    }
};