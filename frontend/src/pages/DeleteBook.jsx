import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";

const DeleteBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5555/books/${id}`)
      .then((res) => setBook(res.data))
      .catch((err) => console.error("Error fetching book:", err));
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:5555/books/${id}`)
      .then(() => navigate("/books"))
      .catch((err) => console.error("Error deleting book:", err));
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl font-bold mb-4 text-red-600">Delete Book</h1>
      {book && (
        <div>
          <p>Are you sure you want to delete <strong>{book.title}</strong> by {book.author}?</p>
          <div className="flex gap-4 mt-4">
            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Yes, Delete
            </button>
            <button onClick={() => navigate("/books")} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteBook;
