import express from "express";
import { port, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

app.use(express.json());


// Root route
app.get("/", (req, res) => {
    return res.status(200).send("Welcome to My website");
});

// Route to save a new book
app.post("/save-book", async (request, response) => {
    try {
        const { title, author, publishYear } = request.body;

        if (!title || !author || !publishYear) {
            return response.status(400).send({
                message: "Please provide all the required fields",
            });
        }

        const newBook = { title, author, publishYear };
        const book = await Book.create(newBook);

        return response.status(201).send({
            message: "Book created successfully",
            book,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get all books
app.get("/get-books", async (request, response) => {
    try {
        const books = await Book.find();
        return response.status(200).send({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get a book by id
app.get("/get-book/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);
        if (!book) {
            return response.status(404).send({
                message: "Book not found",
            });
        }
        return response.status(200).send({
            message: "Book fetched successfully",
            book,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
// Route to update a book by id
app.put("/update-book/:id", async (request, response) =>
    {
        try {
            const { id } = request.params;
            const { title, author, publishYear } = request.body;

            if (!title || !author || !publishYear) {
                return response.status(400).send({
                    message: "Please provide all the required fields",
                });
            }

            const book = await Book.findByIdAndUpdate(
                id,
                { title, author, publishYear },
                { new: true }
            );

            if (!book) {
                return response.status(404).send({
                    message: "Book not found",
                });
            }

            return response.status(200).send({
                message: "Book updated successfully",
                book,
            });
        } catch (error) {
            console.log(error.message);
            response.status(500).send({ message: error.message });
        }
    }
);
// Route to delete a book by id 
app.delete("/delete-book/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            return response.status(404).send({
                message: "Book not found",
            });
        }   
        return response.status(200).send({
            message: "Book deleted successfully",
            book,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
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
