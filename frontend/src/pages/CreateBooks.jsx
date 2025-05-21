import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

const CreateBook = () => {
  const [book, setBook] = useState({ title: "", author: "", publishYear: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5555/books", book)
      .then(() => navigate("/books"))
      .catch((err) => console.error("Error creating book:", err));
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl font-bold mb-4">Create Book</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Title" required value={book.title}
          onChange={(e) => setBook({ ...book, title: e.target.value })} className="border p-2" />
        <input type="text" placeholder="Author" required value={book.author}
          onChange={(e) => setBook({ ...book, author: e.target.value })} className="border p-2" />
        <input type="number" placeholder="Publish Year" required value={book.publishYear}
          onChange={(e) => setBook({ ...book, publishYear: e.target.value })} className="border p-2" />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
