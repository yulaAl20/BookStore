import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Spinner from "../components/spinner";
import BackButton from "../components/BackButton";

const ShowBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setError("Failed to load books.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <BackButton />
      <h1 className="text-4xl font-bold mb-4">Show Books</h1>
      <Link to="/books/create" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600">
        Add New Book
      </Link>
      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="w-full border-separate border-spacing-2">
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Author</th>
                <th>Publish Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={book._id}>
                  <td>{index + 1}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.publishYear}</td>
                  <td className="flex gap-2">
                    <Link to={`/books/${book._id}/edit`} className="text-blue-500 hover:text-blue-700">
                      <AiOutlineEdit />
                    </Link>
                    <Link to={`/books/${book._id}/delete`} className="text-red-500 hover:text-red-700">
                      <AiOutlineDelete />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShowBooks;
