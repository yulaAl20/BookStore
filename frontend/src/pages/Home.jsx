import React,{useEffect , useState} from "react";
import axios from "axios";
import Spinner from "../components/spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox , MdOutlineDelete } from "react-icons/md";
const Home = () => {
    const [ books , setBooks] = useState([]);
    const [loading , setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:5000/api/books")
        .then((response) => {
            setBooks(response.data.books);
            setLoading(false);
        })
        });
    return ( 
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-center mt-10">Welcome to the Book Store</h1>
            <p className="text-center mt-5">Explore our collection of books and find your next read!</p>
        </div>
    )}

export default Home;