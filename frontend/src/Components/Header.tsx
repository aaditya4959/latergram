import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="w-full bg-gray-800 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">LaterGram</h1>
            <nav>
                <Link to="/signin" className="px-4">Sign In</Link>
                <Link to="/signup" className="px-4">Sign Up</Link>
                <Link to="/dashboard" className="px-4">Dashboard</Link>
            </nav>
        </header>
    );
}
