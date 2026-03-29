import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../utils/constant";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";
import { Mail, Lock, Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({ role: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.email || !input.password || !input.role) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0a1e]">
      <Navbar />

      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] px-4">
        <div className="w-full max-w-md">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-white mb-2">Welcome back</h1>
            <p className="text-gray-500 text-sm">Login to continue your job search</p>
          </div>

          <form
            onSubmit={submitHandler}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-5"
          >
            {/* Email */}
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2 block">
                Email
              </label>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-purple-500/50 transition">
                <Mail size={15} className="text-gray-500 shrink-0" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  className="bg-transparent text-white text-sm flex-1 focus:outline-none placeholder-gray-600"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2 block">
                Password
              </label>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-purple-500/50 transition">
                <Lock size={15} className="text-gray-500 shrink-0" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  className="bg-transparent text-white text-sm flex-1 focus:outline-none placeholder-gray-600"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-3 block">
                I am a
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["student", "recruiter"].map((role) => (
                  <label
                    key={role}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl border cursor-pointer transition text-sm font-medium capitalize ${
                      input.role === role
                        ? "border-purple-500 bg-purple-500/10 text-purple-300"
                        : "border-white/10 text-gray-500 hover:border-white/20 hover:text-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role}
                      checked={input.role === role}
                      onChange={changeEventHandler}
                      className="hidden"
                    />
                    {role}
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#a855f7] text-white font-semibold text-sm hover:opacity-90 transition flex items-center justify-center gap-2 mt-2"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-sm text-center text-gray-500 pt-2">
              Don't have an account?{" "}
              <Link to="/signup" className="text-purple-400 hover:text-purple-300 transition">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;