    import React, { useEffect, useState } from "react";
    import axios from "axios";
    import Spinner from "../components/spinner";
    import { Link } from "react-router-dom";
    import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
    import { BsInfoCircle } from "react-icons/bs";
    import { MdOutlineAddBox , MdOutlineDelete } from "react-icons/md";

    const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:5555/books")
        .then((response) => {
            setBooks(response.data.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching books:", error);
            setLoading(false);
        });
    }, []);

    return (
        <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mt-10">Welcome to the Book Store</h1>
        <p className="text-center mt-5">Explore our collection of books and find your next read!</p>
        <h2 className="text-2xl font-bold mt-10">Books List</h2>
        <div className="flex justify-end mt-5">
            <Link to="/books/create" className="flex items-center gap-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            <MdOutlineAddBox /> Add Book
            </Link>
        </div>

        <div className="mt-10">
            {loading ? (
            <Spinner />
            ) : (
            <table className="w-full border-separate border-spacing-2">
    <thead>
        <tr>
        <th className="border border-slate-600 rounded-md">No</th>
        <th className="border border-slate-600 rounded-md">Title</th>
        <th className="border border-slate-600 rounded-md max-md:hidden">
            Author
        </th>
        <th className="border border-slate-600 rounded-md max-md:hidden">Publish Year</th>
        <th className="border border-slate-600 rounded-md">Actions</th>
        </tr>
    </thead>
    <tbody>
        {books.map((book, index) => (
        <tr key={book._id}>
            <td className="border border-slate-600 rounded-md">{index + 1}</td>
            <td className="border border-slate-600 rounded-md">{book.title}</td>
            <td className="border border-slate-600 rounded-md">{book.author}</td>
            <td className="border border-slate-600 rounded-md max-md:hidden">{book.publishYear}</td>
            <td className="border border-slate-600 rounded-md flex gap-2">
            <Link to={`/books/${book._id}`} className="text-blue-500 hover:text-blue-700">
                <BsInfoCircle />
            </Link>
            <Link to={`/books/edit/${book._id}`} className="text-yellow-500 hover:text-yellow-700">
                <AiOutlineEdit />
            </Link>
            <Link to={`/books/delete/${book._id}`} className="text-red-500 hover:text-red-700">
                <AiOutlineDelete />
            </Link>
            </td>
        </tr>
        ))}
    </tbody>
    </table>

                )}
        </div>
        </div>
    );
    };

    export default Home;
