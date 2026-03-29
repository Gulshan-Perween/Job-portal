import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { Building2, Loader2, ArrowLeft } from 'lucide-react'

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Please enter a company name");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/admin/companies/${res.data.company._id}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0a1e]">
      <Navbar />

      <div className="max-w-xl mx-auto px-4 py-16">

        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/20 flex items-center justify-center mb-6">
          <Building2 size={24} className="text-purple-400" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Name your company
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          What would you like to call your company? You can always change this later.
        </p>

        {/* Input */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2 block">
              Company Name
            </label>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-purple-500/50 transition">
              <Building2 size={15} className="text-gray-500 shrink-0" />
              <input
                type="text"
                placeholder="JobHunt, Microsoft, Google..."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && registerNewCompany()}
                className="bg-transparent text-white text-sm flex-1 focus:outline-none placeholder-gray-600"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => navigate("/admin/companies")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm hover:border-white/20 hover:text-white transition"
            >
              <ArrowLeft size={14} /> Cancel
            </button>
            <button
              onClick={registerNewCompany}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#a855f7] text-white text-sm font-semibold hover:opacity-90 transition"
            >
              {loading && <Loader2 size={15} className="animate-spin" />}
              {loading ? "Creating..." : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;