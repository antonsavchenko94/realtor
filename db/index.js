var mysql = require('mysql');

var connection  = mysql.createConnection({
        host        :   'sql4.freemysqlhosting.net',
        user        :   'sql496545',
        password    :   'c2HXNikVMn',
        database    :   'sql496545'
    });
//var connection  = mysql.createConnection({
//    host        :   'localhost',
//    user        :   'root',
//    password    :   'BanderaMozli1994',
//    database    :   'company'
//});

module.exports = {
    users: function (res) {
        var query = connection.query('select * from user', function (err, rows, fields) {
            if (err) throw err;
            res.send(rows);
        });
    },
    user:function (req, res) {
        try{
            if(req.param("password") && req.param("email")){
                var query = connection.query('select * from user where password =\''+req.param("password")+'\' and email='+req.param("email"), function (err, rows, fields) {
                    if (err) throw err;
                    if(rows[0]) res.send('Yes');
                    else res.send('No');
                });
            }
        }catch(err){
            res.send("It`s wrong request!!! Be careful")
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