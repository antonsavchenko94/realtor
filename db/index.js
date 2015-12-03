var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');

var connection  = mysql.createConnection({
    host        :   'db4free.net',
    user        :   'mozli',
    password    :   'qwertyui',
    database    :   'realtor_company'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

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
                var query = connection.query('select * from user where  email='+req.param("email"), function (err, rows, fields) {
                    if (err) throw err;

                    if(rows[0]) {

                        if (bcrypt.compareSync(req.param("password"), rows[0].password)) {
                            res.send('Yes');

                        } else res.send('No');
                    }
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
                res.send(rows);
            });
        }
    },
    advertSecond:function (req, res) {
        console.log(req.param("deal"));
            var query = connection.query('select * from advert where deal_type =\''+req.param("deal")+'\' and realty_type=\''+req.param("realty")+'\'', function (err, rows, fields) {
                if (err) throw err;
                res.send(rows);
            });
    },

    advertsNotJson: function(f){
        var query = connection.query('select * from advert', function (err, rows, fields) {
            if (err) throw err;
            obj = rows;
            f(rows);
        });
    },
    singleAdvert: function(req ,f){
        if(req.param('id')){
            var query = connection.query('select * from advert where advert_id ='+req.param('id'), function (err, advert, fields) {
                if (err) throw err;
                connection.query('select * from user where user_id = ' +
                    '(select user_id from advert where advert_id ='+req.param('id')+')',function (err, user, fields) {
                    f(advert,user);
                });
            });
        }else{
            throw "ERROR HA-HA";
        }
    },
    saveUser:function(user, f){
        //var fullName = user.name.split(' ', 2);
        var query = connection.query('select * from user', function (err, couunt, fl) {
            if (err) throw err;
            connection.query('INSERT INTO user (user_id,first_name, last_name, phone, password, email) VALUES ('+ (couunt.length+1)+',\''+ user.name +'\', \'' +
                ''+ user.last_name +'\', \'' +
                ''+ user.phone +'\', \'' +
                ''+bcrypt.hashSync(user.password, null, null)+'\', \'' +
                ''+ user.email +'\')', function(err, result) {
                if (err) throw err;
                if (typeof f == 'function') {
                    f('User save');
                }
            });
        });
    },
    saveAdvert:function(advert, user,f){
        var query = connection.query('select * from advert', function (err, couunt, fl) {
            if (err) throw err;
            connection.query('INSERT INTO advert (user_id, advert_id,tittle, description, price, latitude, longitude, image, deal_type, realty_type) VALUES ('
                + user +',\''
                + (couunt.length+1)+'\', \'' +
                ''+ advert.tittle +'\', \'' +
                ''+ advert.description +'\', \'' +
                ''+ advert.price +'\', \'' +
                ''+ advert.lat +'\', \'' +
                ''+ advert.lng +'\', \'' +
                ''+ advert.image +'\', \'' +
                ''+ advert.deal_type +'\', \'' +
                ''+ advert.realty_type +'\')', function(err, result) {
                if (err) throw err;
                if (typeof f == 'function') {
                    f('Success');
                }
            });
        });
    },
    userByid:function(req, f){
        connection.query('select phone, first_name, last_name, phone, email from user where user_id='+ req.param('id'), function (err, row, fl) {
            if (err) throw err;
            f(row);
        });
    }

};