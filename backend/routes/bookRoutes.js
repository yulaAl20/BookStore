import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();
// Route to save a new book
router.post("/", async (request, response) => {
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
router.get("/", async (request, response) => {
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
router.get("/:id", async (request, response) => {
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
router.put("/:id", async (request, response) =>
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
router.delete("/:id", async (request, response) => {
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

export default router;