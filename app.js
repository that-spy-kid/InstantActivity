const express = require("express");
const app = express();
const http = require("http");
const ejs = require("ejs");
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let activityData;

app.get("/", (req,res)=>{
    res.render("activity", {activity: activityData});
    res.redirect("/");
});

app.post("/", (req,res)=>{
     
    const querry = req.body.typeName;
    const url = "http://www.boredapi.com/api/activity?type=" + querry;
    
    
    http.get(url, (response)=>{
        response.on("data", (data)=>{
            const activityList = JSON.parse(data);
            activityData = activityList.activity;
           res.redirect("/"); 
        });
    });

});



app.listen(3000, ()=>{
    console.log("server is running on port 3000");
});