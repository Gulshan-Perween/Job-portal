import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { ArrowLeft, Loader2, Building2, Globe, MapPin, FileText, Upload } from 'lucide-react'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);

  const { singleCompany } = useSelector(store => store.company);
  const [input, setInput] = useState({
    name: "", description: "", website: "", location: "", file: null
  });
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
    setFileName(file?.name || "");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: null
    });
  }, [singleCompany]);

  const fields = [
    { label: "Company Name", name: "name", placeholder: "e.g. Microsoft", icon: <Building2 size={15} /> },
    { label: "Description", name: "description", placeholder: "Brief about the company", icon: <FileText size={15} /> },
    { label: "Website", name: "website", placeholder: "https://company.com", icon: <Globe size={15} /> },
    { label: "Location", name: "location", placeholder: "Delhi, Mumbai...", icon: <MapPin size={15} /> },
  ];

  return (
    <div className="min-h-screen bg-[#0f0a1e]">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-12">

        {/* Back + Title */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/admin/companies")}
            className="flex items-center gap-2 text-sm text-gray-400 border border-white/10 px-4 py-2 rounded-xl hover:border-purple-500/40 hover:text-purple-300 transition"
          >
            <ArrowLeft size={14} /> Back
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Company Setup</h1>
            <p className="text-gray-500 text-xs mt-0.5">Update your company information</p>
          </div>
        </div>

        <form onSubmit={submitHandler}>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">

            {/* Text fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {fields.map(({ label, name, placeholder, icon }) => (
                <div key={name}>
                  <label className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2 block">
                    {label}
                  </label>
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-purple-500/50 transition">
                    <span className="text-gray-500 shrink-0">{icon}</span>
                    <input
                      type="text"
                      name={name}
                      value={input[name]}
                      onChange={changeEventHandler}
                      placeholder={placeholder}
                      className="bg-transparent text-white text-sm flex-1 focus:outline-none placeholder-gray-600"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Logo upload */}
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2 block">
                Company Logo
              </label>
              <label className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 cursor-pointer hover:border-purple-500/40 transition">
                <Upload size={15} className="text-gray-500 shrink-0" />
                <span className="text-sm text-gray-500 truncate">
                  {fileName || "Click to upload logo"}
                </span>
                <input
                  type="file"
                  name="file"
                  accept="image/*"
                  onChange={changeFileHandler}
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
              {loading && <Loader2 size={15} className="animate-spin" />}
              {loading ? "Updating..." : "Update Company"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;