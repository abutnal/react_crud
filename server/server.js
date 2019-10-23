const express = require('express');
const cors = require('cors');
var mysql = require('mysql');
var bodyParser = require('body-parser')
const app = express();

app.use(cors());

// Database connection
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "react_crud"
});

//Check connection
con.connect(function(err){
 if(err) throw err;
 console.log(con);
});


// Select Data
const SELECT_ALL_QUERY = "SELECT * FROM user_tbl";
function showData(){
  app.get('/api/customers', (req, res)=>{ 
   con.query(SELECT_ALL_QUERY, function(err, result){
     if(err){
      return res.send(err);
    }
    else{
     const customers = result;
     res.json(customers);
   }
 });
 });
}

showData();


// BodyParser 
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb',
  parameterLimit: 100000
}))
app.use(bodyParser.json({
  limit: '50mb',
  parameterLimit: 100000
}))

// Store Data into DB
app.post('/api/stored', (req, res) => {
  const INSERT_QUERY = "INSERT INTO user_tbl (name, phone, email, password) VALUES ('"+req.body.name+"', '"+req.body.phone+"', '"+req.body.email+"', '"+req.body.password+"')";
  con.query(INSERT_QUERY, function (err, result) {
    if (err) throw err;
    const status = "1 record inserted";
    // res.send({status});
    res.json(status); 
    showData();

  });
});

// Update data into DB
app.post('/api/update', (req, res) => {
  const UPDATE_QUERY = "UPDATE user_tbl SET `name`='"+req.body.name+"', `phone`='"+req.body.phone+"', `email`='"+req.body.email+"', `password`='"+req.body.password+"' WHERE `user_id`='"+req.body.user_id+"'"
  con.query(UPDATE_QUERY, function (err, result) {
    if (err) throw err;
    const status = "1 record Updated";
    // res.send({status});
    res.json(status); 
    showData();

  });
});


// Select single row from DB
app.post('/api/edit', (req, res)=>{
    // console.log(req.body.user_id); 
    const SELECT_WHERE = "SELECT * FROM user_tbl WHERE user_id='"+ req.body.user_id +"'";
    // res.send(SELECT_WHERE);
    con.query(SELECT_WHERE, function(err, result){
         if(err) throw err;
         const oneRow = result;
         res.json(oneRow); 
    });
});

// Delete row 
app.post('/api/delete', (req, res)=>{
    // console.log(req.body.user_id); 
    const SELECT_DELETE = "DELETE FROM user_tbl WHERE user_id='"+ req.body.user_id +"'";
    // res.send(SELECT_WHERE);
    con.query(SELECT_DELETE, function(err, result){
         if(err) throw err;
         const deletedRow = '1 row deleted';
         res.json(deletedRow); 
    });
});


// Listening port
const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));