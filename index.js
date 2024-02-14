const express = require ("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat =require("./models/chat.js");
const methodOverride = require("method-override")

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main().then(()=>{console.log('connection successful')})
.catch(err => console.log(err));
async function main() {
await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');
}

let port = 8080;

//Index route
app.get("/chats",async (req,res)=>{
    let chats = await Chat.find();
    res.render("home.ejs",{chats})
});

//New Route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs")
})

//Create Route 
app.post("/chats",(req,res)=>{
    let {from , msg , to} = req.body;
    let newChat = new Chat(
        {
            from :from,
            msg:msg,
            to: to,
            created_at:new Date()
        })
    newChat.save()
    .then(()=>{console.log("chat is working")})
    .catch((err)=>{console.log(err)})

    res.redirect("/chats")
})


//Edit Route
app.get("/chats/:id/edit",async (req,res)=>{
    let {id}= req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
})

//Update Route
app.put("/chats/:id",async(req,res)=>{
    let {id}= req.params;
    let {msg:newMsg} = req.body;
    let newChat = await Chat.findByIdAndUpdate(id,
        {msg: newMsg },{runValidators:true, new:true})
        res.redirect("/chats")
})

//Destroy Route
app.delete("/chats/:id",async(req,res)=>{
    let {id}= req.params;
    let deleteChat =await Chat.findByIdAndDelete(id);
    console.log(deleteChat);
    res.redirect("/chats")
})
app.get("/",(req,res)=>{
    res.send("working")
})

app.listen(port,()=>{
    console.log("listening on port 8080");
})