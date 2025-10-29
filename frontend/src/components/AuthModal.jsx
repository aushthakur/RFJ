import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { X } from "lucide-react";

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [loading, setLoading] = useState(false);
  const { loginUser, user } = useContext(AuthContext);

  // If already logged in, close modal immediately (prevents repeated login)
  useEffect(() => {
    if (user && isOpen) {
      onClose();
    }
    // NOTE: onClose likely stable from parent; if not, you can ignore eslint here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        return alert("Passwords do not match!");
      }
      if (!formData.agree) {
        return alert("You must agree to the Terms and Privacy Policy.");
      }
    }

    setLoading(true);

    try {
      if (isLogin) {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        // support both res.data.token and res.data (if backend returns object)
        const token = res.data?.token ?? res.data;
        if (!token) {
          throw new Error("Token not returned from server");
        }

  loginUser(token);
alert("Login successful!");
// Wait until context updates, then close modal
setTimeout(() => {
  console.log("Token saved in context:", token);
  onClose();
}, 500);


      } else {
        await axios.post("http://localhost:5000/api/auth/signup", {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });
        alert("Signup successful! Please login.");
        setIsLogin(true);
        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
          agree: false,
        });
      }
    } catch (error) {
      console.error(error.response || error);
      alert(error.response?.data?.message || error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-5xl h-[85vh] flex rounded-2xl overflow-hidden shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md"
          aria-label="Close modal"
        >
          <X size={20} className="text-gray-600" />
        </button>

        {/* Left side - form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <p className="text-gray-500 mb-8 text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span
              className="text-yellow-600 cursor-pointer hover:text-yellow-700 font-medium transition-colors"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Create a new one." : "Login."}
            </span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <label className="flex items-start space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                    required
                  />
                  <span className="text-gray-600 text-sm leading-tight">
                    I have read and agreed to the{" "}
                    <span className="text-yellow-600 hover:underline">
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className="text-yellow-600 hover:underline">
                      Privacy Policy
                    </span>
                  </span>
                </label>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg mt-6 text-white font-medium transition-all duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-900 hover:bg-yellow-600 transform hover:scale-[1.02]"
              }`}
            >
              {loading
                ? isLogin
                  ? "Logging in..."
                  : "Creating account..."
                : isLogin
                ? "Login"
                : "Create Account"}
            </button>

            {isLogin && (
              <p className="text-center mt-4 text-sm">
                <a
                  href="#"
                  className="text-yellow-600 hover:text-yellow-700 font-medium transition-colors"
                >
                  Forgot Your Password?
                </a>
              </p>
            )}
          </form>

          {/* Social Login Options (Optional) */}
          {isLogin && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {/* Google icon */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    Google
                  </span>
                </button>

                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="#1877F2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    Facebook
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right side - image */}
        <div className="hidden md:block w-1/2 relative">
          <img
            src={
              isLogin
                ? "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=1200&fit=crop&q=80"
                : "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=1200&fit=crop&q=80"
            }
            alt={isLogin ? "Login" : "Sign Up"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h3 className="text-3xl font-bold mb-2">
              {isLogin ? "Welcome Back!" : "Join Our Family"}
            </h3>
            <p className="text-lg opacity-90">
              {isLogin
                ? "Discover our exquisite collection of handcrafted Indian jewellery"
                : "Create an account to explore our stunning collection"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
