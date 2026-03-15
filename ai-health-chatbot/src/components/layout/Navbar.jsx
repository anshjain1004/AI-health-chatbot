import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-lg font-semibold text-slate-800">
          <span className="text-teal-600">AI</span> Health Assistant
        </h1>

        {/* Links */}
        <div className="flex gap-8 text-slate-600 font-medium">
          <Link to="/" className="hover:text-teal-600 transition">
            Home
          </Link>
          <Link to="/diseases" className="hover:text-teal-600 transition">
            Diseases
          </Link>
          <Link to="/chat" className="hover:text-teal-600 transition">
            Chat
          </Link>
          <Link to="/myths" className="hover:text-teal-600 transition">
            Myths
          </Link>
        </div>

      </div>
    </nav>
  );
}