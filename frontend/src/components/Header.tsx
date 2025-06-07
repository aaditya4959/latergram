
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore"; // Adjust the path if needed

export default function Header() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const signOut = useAuthStore((state) => state.signOut);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <div className="flex flex-row justify-around text-center items-center bg-[#11182a] h-20 w-full p-4 font-mono">
      {/* The name of the application */}
      <div className="text-3xl font-bold">
        <h1 className="bg-gradient-to-r from-[#72a2f4] to-[#b787fe] bg-clip-text text-transparent">
          LaterGram
        </h1>
      </div>

      {/* The navigation items */}
      <div className="w-1/4">
        <ul className="text-white flex flex-row justify-around items-center">
          <li><Link to="/features">Features</Link></li>
          <li><Link to="/working">Working</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>

      {/* Auth buttons */}
      <div className="w-1/7">
        {isAuthenticated ? (
          <ul className="text-white flex flex-row justify-between items-center">
            <li>
              <button onClick={handleSignOut} className="text-white bg-[#267beb] p-2 rounded-md">
                SignOut
              </button>
            </li>
          </ul>
        ) : (
          <ul className="text-white flex flex-row justify-between items-center">
            <li><Link to="/dashboard">SignIn</Link></li>
            <li className="bg-[#267beb] p-2 rounded-md">
              <Link to="/get-started">Get Started</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
