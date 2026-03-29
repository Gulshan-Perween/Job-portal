import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT, COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { Briefcase, MapPin, IndianRupee, Clock, Users, FileText, Building2, Loader2, ArrowLeft } from 'lucide-react';

const AdminJobCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [input, setInput] = useState({
    title: '', description: '', location: '',
    salary: '', jobType: '', position: '',
    experience: '', requirements: '', companyId: ''
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
        if (res.data.success) setCompanies(res.data.companies);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompanies();
  }, []);

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const payload = {
      ...input,
      requirements: input.requirements.split(',').map(r => r.trim()).filter(Boolean),
    };
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, payload, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success("Job posted successfully!");
        navigate('/admin/jobs');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: "Job Title", name: "title", placeholder: "e.g. Frontend Developer", icon: <Briefcase size={15} /> },
    { label: "Location", name: "location", placeholder: "e.g. Delhi, Remote", icon: <MapPin size={15} /> },
    { label: "Salary (LPA)", name: "salary", placeholder: "e.g. 12", icon: <IndianRupee size={15} /> },
    { label: "Experience (yrs)", name: "experience", placeholder: "e.g. 2", icon: <Clock size={15} /> },
    { label: "Positions", name: "position", placeholder: "e.g. 3", icon: <Users size={15} /> },
  ];

  return (
    <div className="min-h-screen bg-[#0f0a1e]">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/admin/jobs")}
            className="flex items-center gap-2 text-sm text-gray-400 border border-white/10 px-4 py-2 rounded-xl hover:border-purple-500/40 hover:text-purple-300 transition"
          >
            <ArrowLeft size={14} /> Back
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Post a New Job</h1>
            <p className="text-gray-500 text-xs mt-0.5">Fill in the details to create a job listing</p>
          </div>
        </div>

        <form onSubmit={submitHandler}>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">

            {/* Text fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {fields.map(({ label, name, placeholder, icon }) => (
                <div key={name}>
                  <label className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2 block">{label}</label>
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-purple-500/50 transition">
                    <span className="text-gray-500 shrink-0">{icon}</span>
                    <input
                      type="text"
                      name={name}
                      value={input[name]}
                      onChange={changeHandler}
                      placeholder={placeholder}
                      className="bg-transparent text-white text-sm flex-1 focus:outline-none placeholder-gray-600"
                    />
                  </div>
                </div>
              ))}

              {/* Job Type */}
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2 block">Job Type</label>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-purple-500/50 transition">
                  <Clock size={15} className="text-gray-500 shrink-0" />
                  <select
                    name="jobType"
                    value={input.jobType}
                    onChange={changeHandler}
                    className="bg-transparent text-white text-sm flex-1 focus:outline-none"
                  >
                    <option value="" className="bg-[#0f0a1e]">Select type</option>
                    <option value="Full Time" className="bg-[#0f0a1e]">Full Time</option>
                    <option value="Part Time" className="bg-[#0f0a1e]">Part Time</option>
                    <option value="Remote" className="bg-[#0f0a1e]">Remote</option>
                    <option value="Internship" className="bg-[#0f0a1e]">Internship</option>
                    <option value="Contract" className="bg-[#0f0a1e]">Contract</option>
                  </select>
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2 block">Company</label>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-purple-500/50 transition">
                  <Building2 size={15} className="text-gray-500 shrink-0" />
                  <select
                    name="companyId"
                    value={input.companyId}
                    onChange={changeHandler}
                    className="bg-transparent text-white text-sm flex-1 focus:outline-none"
                  >
                    <option value="" className="bg-[#0f0a1e]">Select company</option>
                    {companies.map((company) => (
                      <option key={company._id} value={company._id} className="bg-[#0f0a1e]">
                        {company.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2 block">Description</label>
              <div className="flex gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-purple-500/50 transition">
                <FileText size={15} className="text-gray-500 shrink-0 mt-0.5" />
                <textarea
                  name="description"
                  value={input.description}
                  onChange={changeHandler}
                  placeholder="Describe the role, responsibilities..."
                  rows={3}
                  className="bg-transparent text-white text-sm flex-1 focus:outline-none placeholder-gray-600 resize-none"
                />
              </div>
            </div>

            {/* Requirements */}
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2 block">
                Requirements <span className="normal-case text-gray-600">(comma separated)</span>
              </label>
              <div className="flex gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-purple-500/50 transition">
                <FileText size={15} className="text-gray-500 shrink-0 mt-0.5" />
                <textarea
                  name="requirements"
                  value={input.requirements}
                  onChange={changeHandler}
                  placeholder="React, Node.js, MongoDB..."
                  rows={2}
                  className="bg-transparent text-white text-sm flex-1 focus:outline-none placeholder-gray-600 resize-none"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#a855f7] text-white font-semibold text-sm hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={15} className="animate-spin" />}
              {loading ? "Posting..." : "Post Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminJobCreate;