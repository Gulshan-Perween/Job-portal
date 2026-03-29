import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { Search, Plus } from 'lucide-react';

const Companies = () => {
  useGetAllCompanies();

  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-[#0f0a1e]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="mb-8">
          <p className="text-purple-400 text-xs uppercase tracking-widest mb-1">Admin Panel</p>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Companies</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your registered companies</p>
        </div>

        {/* Search + New Company */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 w-full max-w-sm focus-within:border-purple-500/50 transition">
            <Search size={15} className="text-gray-500 shrink-0" />
            <input
              type="text"
              placeholder="Filter by name..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent text-white text-sm flex-1 focus:outline-none placeholder-gray-600"
            />
          </div>

          <button
            onClick={() => navigate('/admin/companies/create')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#a855f7] text-white text-sm font-semibold hover:opacity-90 transition shrink-0"
          >
            <Plus size={16} />
            New Company
          </button>
        </div>

        {/* Table */}
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;