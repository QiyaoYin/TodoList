const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const jsonParser = bodyParser.json();
//const urlencodeParser = bodyParser.urlencoded({ extended: false });

const origin = ['http://localhost:3000','http://192.168.0.109:3000'];
const methods = ['GET','POST','OPTION'];


app.use(cors({
    origin,
    methods
}));

app.post('/test',jsonParser,(req,res)=>{
    console.log(req.body);
    let {message} = req.body;
    res.json({message});
})

app.listen(4000,'0.0.0.0',()=>{
    console.log(`run successfully!${new Date().toLocaleDateString()}`);
});