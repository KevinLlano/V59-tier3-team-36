import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkStyle = ({ isActive }) =>
    isActive
        ? "text-green-600 font-semibold"
        : "hover:text-green-600"

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="text-xl font-bold text-green-600">
            AI Interview Question Generator
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <NavLink to="/" className={linkStyle}>Home</NavLink>
            <NavLink to="/roles" className={linkStyle}>Roles</NavLink>
            <NavLink to="/question" className={linkStyle}>Questions</NavLink>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t px-4 py-2 space-y-2">
          <NavLink className="block px-4 py-2" to="/">Home</NavLink>
          <NavLink className="block px-4 py-2" to="/roles">Roles</NavLink>
          <NavLink className="block px-4 py-2" to="/question">Questions</NavLink>
        </div>
      )}
    </nav>
  );
}