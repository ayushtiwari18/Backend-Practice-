const express = require("express");
const app = express();
const path = require("path");

let port =8080;

app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
});

app.use(express.static("public"))

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/",(req,res)=>{
    res.send("you contacted root path");
});

app.get("/ig/:username", (req, res)=>{
    let {username} = req.params;
    const instaData = require("./data.json");
    const data = instaData[username];
    console.log(data);
        res.render("instagram.ejs",{data});
});