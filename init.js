const mongoose = require("mongoose");
const Chat =require("./models/chat.js")

main().then(()=>{console.log('connection successful')})
.catch(err => console.log(err));
async function main() {
await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');
}

let allChats = [
    {
    
            from:"rabeet",
            to:"fahad",
            msg:"math ki practice krein",
            created_at:new Date()
        
    },
    {
        from:"huzaifa",
            to:"murtaza",
            msg:"cousre ki class lene gia tha",
            created_at:new Date()
        
    },
    {
        from:"munnaf",
            to:"fahad",
            msg:"mein to doctor banu ga",
            created_at:new Date()
        
    },
    {
    from:"rabeet",
            to:"tayyab",
            msg:"tayyab bhai manual de do",
            created_at:new Date()
    }
];

Chat.insertMany(allChats);