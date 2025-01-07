import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="bg-gray-800 text-purple-300 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Bekzod
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-purple-400 transition-colors">
            Home
          </Link>
          <Link to="/about" className="hover:text-purple-400 transition-colors">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
