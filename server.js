var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool = require('pg').pool;
var crypto =require('crypto');

var config = { 
    User: 'arulprakashekambaram',
    database:'arulprakashekambram',
    host: 'db.imad.hasura-app.io',
    port:'5432',
    password: processenv.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt) {
    //how do we create a hash?
    var hashed= crypto.pdkdf2(input,salt,10000,512,'sha512');
    return["pbkdf2","10000",salt,hashed.toString('hex')]. join('$');
}
 
app.get('/hash/:input', function(req,res){
  var hashedstring= hash(req.params.input,'this-is-some-random-string');
  res.send(hashedstring);
    });



var pool = new Pool(config);
app.get('test-db', function (req, res){ 
    //make a select request
    //Return a response with results
  pool.query('SELECT*FROM text',function(err,result){
      if(err){
          res.send(500).send(err.toString() );
      } else{
          res.send(JSON.stringfy(result)); 
      }
  });
});

app.get('/Mistone', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'ARP.html'));
});

app.get('/Misttwo', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'ARP 1.html'))
});

app.get('/Mistthird', function (req, res) {
  res.sendFile(path.join(__dirname,'ui','ARP 2.html'))
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var counter=0;
app.get('/counter',function(req,res){
    counter= counter +1;
    res.send(counter.toString());
   });


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
