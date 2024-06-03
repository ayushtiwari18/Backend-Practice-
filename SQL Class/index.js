const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password:'Maya5410,./'
});

let getRandomUser = () => {
    return [
       faker.string.uuid(),
       faker.internet.userName(),
       faker.internet.email(),
       faker.internet.password(),
    ];
};

let q ="INSERT INTO user (id,username,email,password) VALUES ?";
// let data = [];
// for(let i=1;i<=100;i++){
//  data.push(getRandomUser());//100 random user
// }

// 
//HOME ROUTE
app.get("/",(req,res)=>{
  let q = `SELECT count(*) FROM user`;
  try{
      connection.query(q, (err,result)=>{
        if(err) throw err;
        let count = result[0]["count(*)"];
      res.render("home.ejs", {count});
    })
    } catch(err){
      console.log(err);
      res.send("some error in db");
    }
});

//Show Route
app.get("/user", (req,res)=>{
  let q = `SELECT * FROM user`;
 
  try{
    connection.query(q, (err,users)=>{
      if(err) throw err;
    //  
    res.render("show.ejs",{users} );
  })
  } catch(err){
    console.log(err);
    res.send("some error in db");
  }
})

//Edit
app.get("/user/:id/edit", (req, res)=>{
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  console.log(id);
  try{
    connection.query(q, (err, result) =>{
      
      if(err) throw err;
      console.log(result);
      res.render("edit.ejs");
  });
  } catch(err){
    console.log(err);
    res.send("some error in db");
  }
});

app.listen("8080" , () => {
 console.log("server is listing to port 8080");
});

//try{
//   connection.query(q,[data], (err,result)=>{
//     if(err) throw err;
//   console.log(result);
// })
// } catch(err){
//   console.log(err);
// }
// connection.end();