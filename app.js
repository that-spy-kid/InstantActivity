const express = require("express");
const app = express();
const http = require("http");
const ejs = require("ejs");
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let activity="activity";
let type = "tag";
let participants = "participants";
let price = "price";
let accessibility = "accessibility";
let link = "Find me";

app.get("/", (req,res)=>{
    res.render("activity", {activity: activity,type : type,participants: participants,price: price, accessibility : accessibility , link: link});
});

app.post("/", (req,res)=>{
     
    const querry = req.body.typeName;
    const url = "http://www.boredapi.com/api/activity?type=" + querry;
    
    
    http.get(url, (response)=>{
        response.on("data", (data)=>{
            const activityList = JSON.parse(data);
            activity = activityList.activity;
            type = activityList.type;
            participants = activityList.participants;
            // link = activityList.link;
            if(activityList.price == 0)
            {
                price = "Free";
            }
            else if(activityList.price <= 0.5)
            {
                price = "Inexpensive";
            }
            else {
                price = "Afordable";
            }

        if(activityList.accessibility == 0)
        {
            accessibility = "At Hand";
        }
        else if(activityList.accessibility <= 0.5)
        {
            accessibility = "Available";
        }
        else{
            accessibility = "Challenging";
        }
        if(activityList.link === "")
        {
             var act = activityList.activity;
             const arr = act.split(" ");
             var temp = "", i;
             for (i=0;i<arr.length-1; i++)
             {
                 temp += arr[i] + "+";
             }
             temp += arr[i];
             link = "https://www.google.com/search?q=" + temp; 
        } else {
            link = activityList.link;
        }
           res.redirect("/"); 
        });
    });

});



app.listen( process.env.PORT || 3000 , ()=>{
    console.log("server is running on port 3000");
});