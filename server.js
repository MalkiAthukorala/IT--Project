const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //use for convert json format to javaScript
const cors = require('cors');

const app = express();

const inventoryRouter = require("./routes/inventorys.js");

app.use(cors());
app.use(bodyParser.json());

app.use(inventoryRouter);


const PORT = 8000;

const DB_URL  = `mongodb+srv://MAdbuser:123@cluster0.psr8j.mongodb.net/inventory_db?retryWrites=true&w=majority`;

mongoose.connect(DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify: false
    
})


mongoose.connect(DB_URL)
.then(()=>{
    console.log('MongoDB Connected!');
})
.catch((err)=> console.log('DB Connection Error!',err));                 

app.listen(PORT, ()=>{
         console.log(`App is running on ${PORT}`);
});
