import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';

// Navbar Component
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate=useNavigate()
const handleLogout=()=>{
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  navigate('/login')
}
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex items-center relative">
      <div className="text-2xl font-bold flex-1">BlogApp</div>
      <button
        className="md:hidden bg-blue-600 px-3 py-2 rounded text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? 'Close' : 'Menu'}
      </button>
      <ul
        className={`md:flex md:space-x-6 absolute md:static top-full left-0 w-full bg-gradient-to-r from-blue-500 to-purple-600 md:bg-transparent md:w-auto transition-transform transform md:translate-x-0 flex-1 text-center ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <li className="p-4 md:p-0 inline-block"><Link to="/blogs/about" className="hover:underline">About</Link></li>
        <li className="p-4 md:p-0 inline-block"><Link to="/blogs/create" className="hover:underline">+ Post</Link></li>
        <li className="p-4 md:p-0 inline-block"><Link to="/blogs/famous" className="hover:underline">Trends</Link></li>
      </ul>
      <button onClick={handleLogout} className="hidden md:block bg-red-500 px-4 py-2 rounded hover:bg-red-600 flex-none">Logout</button>
    </nav>
  );
}

export default Navbar;