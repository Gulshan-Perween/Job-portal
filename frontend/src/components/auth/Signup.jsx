
import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../utils/constant";
import { Mail, Lock, User, Phone, Upload, Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "", phoneNumber: "", role: "",
    file: "", email: "", password: "",
  });
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    const file = e.target.files[0];
    setInput({ ...input, file });
    setFileName(file?.name || "");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);
    formData.append("email", input.email);
    formData.append("password", input.password);
    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: "Full Name", name: "fullname", type: "text", placeholder: "John Doe", icon: <User size={15} /> },
    { label: "Email", name: "email", type: "email", placeholder: "you@example.com", icon: <Mail size={15} /> },
    { label: "Password", name: "password", type: "password", placeholder: "••••••••", icon: <Lock size={15} /> },
    { label: "Phone Number", name: "phoneNumber", type: "text", placeholder: "+91 98765 43210", icon: <Phone size={15} /> },
  ];

  return (
    <div className="min-h-screen bg-[#0f0a1e]">
      <Navbar />

      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] px-4 py-10">
        <div className="w-full max-w-md">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-white mb-2">Create account</h1>
            <p className="text-gray-500 text-sm">Join thousands of job seekers on JobHunt</p>
          </div>

          <form
            onSubmit={submitHandler}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-5"
          >
            {/* Text fields */}
            {fields.map(({ label, name, type, placeholder, icon }) => (
              <div key={name}>
                <label className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2 block">
                  {label}
                </label>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-purple-500/50 transition">
                  <span className="text-gray-500 shrink-0">{icon}</span>
                  <input
                    type={type}
                    name={name}
                    value={input[name]}
                    onChange={changeEventHandler}
                    placeholder={placeholder}
                    className="bg-transparent text-white text-sm flex-1 focus:outline-none placeholder-gray-600"
                  />
                </div>
              </div>
            ))}

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

            {/* File upload */}
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2 block">
                Profile Picture
              </label>
              <label className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 cursor-pointer hover:border-purple-500/40 transition">
                <Upload size={15} className="text-gray-500 shrink-0" />
                <span className="text-sm text-gray-500 truncate">
                  {fileName || "Click to upload image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  name="file"
                  onChange={fileHandler}
                  className="hidden"
                />
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#a855f7] text-white font-semibold text-sm hover:opacity-90 transition flex items-center justify-center gap-2 mt-2"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? "Creating account..." : "Create Account"}
            </button>

            <p className="text-sm text-center text-gray-500 pt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-400 hover:text-purple-300 transition">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;