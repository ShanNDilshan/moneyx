const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//Setup middlewears 
app.use(express.json());
app.use(cors());

//all currecies
app.get("/getAllCurrencies" , async(req , res)=>{
    const nameURL = "https://openexchangerates.org/api/currencies.json?app_id=102c42c99fe44ec39ad2403a38282e44"

    try{

        const namesResponce = await axios.get(nameURL);
        const nameData = namesResponce.data;

        return res.json(nameData);

    }catch(err){
        console.error(err);
    }
})


//listen to a port
app.listen(5000 , () => {
    console.log("SERVER STARTED")
});