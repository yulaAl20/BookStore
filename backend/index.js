import express, { request, response } from "express";
import { port , mongoDBURL } from "./config.js";    
import mangoose from 'mangoose';
const app=express();

app.get('/', (request , response ) =>{
    console.log(request)
    return response.status(234).send('Welcome to My website')
});


mangoose
    .connect(mongoDBURL)
    .then(() => {
        console.log{'App is connected to the Database'};
        app.listen( port  , () =>{
            console.log(`server is running on port ${port}`);
});
    })
    .catch((error) => {
        console.log(error);
    });