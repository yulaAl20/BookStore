import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

const EditBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState({ title: "", author: "", publishYear: "" });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5555/books/${id}`)
      .then((res) => setBook(res.data))
      .catch((err) => console.error("Error loading book:", err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5555/books/${id}`, book)
      .then(() => navigate("/books"))
      .catch((err) => console.error("Error updating book:", err));
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl font-bold mb-4">Edit Book</h1>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <input type="text" value={book.title}
          onChange={(e) => setBook({ ...book, title: e.target.value })} className="border p-2" />
        <input type="text" value={book.author}
          onChange={(e) => setBook({ ...book, author: e.target.value })} className="border p-2" />
        <input type="number" value={book.publishYear}
          onChange={(e) => setBook({ ...book, publishYear: e.target.value })} className="border p-2" />
        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditBook;
