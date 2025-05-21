import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import React from 'react';

const BackButton = ({ destination = '/'}) => {
  return (
    <div className="flex items-center gap-2">
        <Link 
            to={destination}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            
        >    
        <BsArrowLeft classname='text-2xl'/>      
        </Link>

    </div>
    
  );
}