import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const defaultEmail = import.meta.env.VITE_ADMIN_EMAIL;
  const defaultPassword = import.meta.env.VITE_ADMIN_PASSWORD;

  // 🚀 Redirect logged-in users away from login
  useEffect(() => {
    if (localStorage.getItem("adminAuth")) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === defaultEmail && password === defaultPassword) {
      localStorage.setItem("adminAuth", "true");
      navigate("/dashboard", { replace: true }); // replace prevents back to login
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg flex w-full max-w-4xl overflow-hidden">
        {/* Left Section */}
        <div className="hidden md:flex flex-col justify-center items-center bg-white w-1/2 p-10">
          <img src={logo} alt="Logo" className="w-24 h-30 mb-6" />
          <h2 className="text-2xl font-bold mb-2">Login to your account</h2>
          <p className="text-gray-500 text-center">
            Login to access the admin dashboard and manage everything in one
            place.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-10 bg-gray-50">
          <h2 className="text-xl font-bold mb-4">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" /> Keep me logged in
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-3 rounded font-semibold hover:bg-yellow-600 transition"
            >
              EMAIL LOGIN →
            </button>
          </form>
          <p className="mt-4 text-xs text-gray-500">
            By clicking 'Log In' you agree to our website{" "}
            <a href="#" className="underline">
              Terms & Conditions
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
