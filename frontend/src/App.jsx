import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ShowBooks from './pages/ShowBooks'
import EditBook from './pages/EditBook'
import CreateBooks from './pages/CreateBooks'
import DeleteBook from './pages/DeleteBook' 

function App() {
  return(
    <Routes>
      <Route path="/" element={<h1>Welcome to My website</h1>} />
      <Route path="/books" element={<ShowBooks/>} />
      <Route path="/books/new" element={<CreateBooks/>} />
      <Route path="/books/:id/edit" element={<EditBook/>} />
      <Route path="/books/:id/delete" element={<DeleteBook />} />
    </Routes>
  );
};

export default App
