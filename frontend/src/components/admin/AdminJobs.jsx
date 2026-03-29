import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { setAllAdminJobs } from '@/redux/jobSlice';
import { Plus, Search, Briefcase, MapPin, IndianRupee, MoreHorizontal, Pencil, Users } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const AdminJobs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allAdminJobs } = useSelector(store => store.job);
  const [searchText, setSearchText] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const fetchAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getAdminJob`, {
          withCredentials: true
        });
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdminJobs();
  }, []);

  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredJobs(allAdminJobs);
    } else {
      const q = searchText.toLowerCase();
      setFilteredJobs(
        allAdminJobs.filter(job =>
          job.title?.toLowerCase().includes(q) ||
          job.location?.toLowerCase().includes(q)
        )
      );
    }
  }, [searchText, allAdminJobs]);

  return (
    <div className="min-h-screen bg-[#0f0a1e]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="mb-8">
          <p className="text-purple-400 text-xs uppercase tracking-widest mb-1">Admin Panel</p>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Posted Jobs</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all your job listings</p>
        </div>

        {/* Search + New Job */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 w-full max-w-sm focus-within:border-purple-500/50 transition">
            <Search size={15} className="text-gray-500 shrink-0" />
            <input
              type="text"
              placeholder="Search by title or location..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="bg-transparent text-white text-sm flex-1 focus:outline-none placeholder-gray-600"
            />
          </div>
          <button
            onClick={() => navigate('/admin/jobs/create')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#a855f7] text-white text-sm font-semibold hover:opacity-90 transition shrink-0"
          >
            <Plus size={16} /> New Job
          </button>
        </div>

        {/* Jobs list */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-20 text-gray-500 bg-white/5 border border-white/10 rounded-2xl">
            <Briefcase size={32} className="mx-auto mb-3 opacity-30" />
            <p className="text-white font-medium">No jobs posted yet</p>
            <p className="text-sm mt-1">Click "New Job" to post your first listing</p>
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10">
              <p className="text-gray-500 text-xs">
                {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <div className="divide-y divide-white/5">
              {filteredJobs.map((job) => (
                <div key={job._id} className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/20 flex items-center justify-center text-purple-300 font-bold text-sm shrink-0">
                      {job.title?.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm">{job.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin size={10} /> {job.location}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <IndianRupee size={10} /> {job.salary} LPA
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Users size={10} /> {job.applications?.length || 0} applicants
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">
                      {new Date(job.createdAt).toLocaleDateString('en-GB')}
                    </span>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:border-purple-500/40 hover:text-purple-300 transition">
                          <MoreHorizontal size={15} />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-44 p-2 bg-[#0f0a1e] border border-white/10 rounded-xl shadow-xl">
                        <button
                          onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition"
                        >
                          <Users size={13} /> View Applicants
                        </button>
                        <button
                          onClick={() => navigate(`/admin/jobs/${job._id}/edit`)}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition"
                        >
                          <Pencil size={13} /> Edit Job
                        </button>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminJobs;