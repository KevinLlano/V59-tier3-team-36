import { useState, useMemo } from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dateString = useMemo(() => {
    const today = new Date();
    return today.toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    });
  }, []);

  const linkStyle = ({ isActive }) =>
    `px-3 py-1 rounded-md transition-colors duration-200 font-semibold ${
      isActive
        ? "bg-green-600 text-white border border-green-600"
        : "bg-white text-black border-green-600 hover:bg-green-100"
    }`;

  return (
    <nav className="bg-white border-b shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center h-auto md:h-16 py-2 md:py-0">
          <div>
            <div className="text-xl font-bold text-black ">AI Interview Question Generator</div>
            <div className="text-xs text-black mt-1 md:mt-0">{dateString}</div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 mt-2 md:mt-0">
            <NavLink to="/" className={linkStyle}> <FaHome className="inline mr-2 -mt-1" />
              Home
            </NavLink>
            <NavLink to="/roles" className={linkStyle}> <FaUser className="inline mr-2 -mt-1" />
              Roles
            </NavLink>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden self-end mt-2"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t px-4 py-2 space-y-2">
          <NavLink to="/" className="block px-3 py-2 rounded-md border border-green-600 bg-green-600 text-white font-semibold">
            Home <FaHome className="inline ml-2" />
          </NavLink>
          <NavLink to="/roles" className="block px-3 py-2 rounded-md border border-green-600 bg-green-600 text-white font-semibold">
            Roles <FaUser className="inline ml-2" />
          </NavLink>
        </div>
      )}
    </nav>
  );
}