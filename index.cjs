const express = require("express");
const mongoose = require("mongoose");
const Apartment = require("./models/Apartment.cjs");

const PORT = process.env.PORT ?? 5000
const app = express();
const mongoUri = 'mongodb+srv://admin:admin@cluster0.rfpz5.mongodb.net/esoft?retryWrites=true&w=majority';

app.use(express.json({expended:true}));
app.post('/api', async (req,res) =>{
    try
    {
        console.log("Body",req.body);
        const {id} = req.body;  //отправляем данные
        const data = await Apartment.findOne({id}); //ищем данные по представленным данным
        if(data)
        {
            return res.status(201).json({message:'Нашли', data});
        }
        else
        {
            return res.status(400).json({message: "Не нашли",id});
        }


    }
    catch(e)
    {
        res.status(500).json({message: e.message});
    }
});

app.get('/api/all', async (req,res) =>{
    try
    {
        const data = await Apartment.find();
        if(data)
        {
            return res.status(201).json(data);
        }
        else
        {
            return res.status(400).json({message: "Не нашли (все квартиры)"});
        }
    }
    catch(e)
    {
        res.status(500).json({message: e.message});
    }
});

app.get('/api/:id',async(req,res)=>{
    try
    {
        const idap = req.params.id;
        const data = await Apartment.findOne({id:idap});
        if(data)
        {
            return res.status(202).json(data);
        }
        else
        {
            return res.status(400).json({message: "Не нашли (квартиру "+idap+')'});
        }
    }
    catch(error)
    {
        return res.status(400).json({message: error.message});
    }
});

async function start()
{
    try
    {
        await mongoose.connect(mongoUri,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        app.listen(PORT,() => {console.log('PORT: ',PORT)});
    }
    catch(error)
    {
        console.log("Error: ", error.message);
        process.exit(1);
    }
}

start();





