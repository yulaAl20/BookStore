import express from "express";
import { port, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoutes from "./routes/bookRoutes.js";

const app = express();

app.use(express.json());

// Middleware to handle CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// Root route
app.get("/", (req, res) => {
    return res.status(200).send("Welcome to My website");
});

app.use("/books", bookRoutes);

// Connect to MongoDB and start server here (not inside a route!)
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App is connected to the Database");
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });
