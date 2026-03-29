import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { SlidersHorizontal, X } from 'lucide-react';

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector(store => store.job);
  const [filteredJobs, setFilteredJobs] = useState(allJobs);
  const [showFilter, setShowFilter] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!searchedQuery || searchedQuery.trim() === "") {
      setFilteredJobs(allJobs);
    } else {
      const q = searchedQuery.toLowerCase();
      const filtered = allJobs.filter((job) =>
        job.title?.toLowerCase().includes(q) ||
        job.description?.toLowerCase().includes(q) ||
        job.location?.toLowerCase().includes(q) ||
        job.jobType?.toLowerCase().includes(q) ||
        job.salary?.toString().toLowerCase().includes(q)
      );
      setFilteredJobs(filtered);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-[#0f0a1e]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-center mb-8">
  <p className="text-purple-400 text-xs uppercase tracking-widest mb-2">Browse Opportunities</p>
  <h1 className="text-2xl md:text-3xl font-bold text-white">
    {searchedQuery
      ? <>Showing results for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#6A38C2]">"{searchedQuery}"</span></>
      : <>Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#6A38C2]">Thousands</span> of Jobs</>
    }
  </h1>
  <p className="text-gray-500 text-sm mt-2">
    {filteredJobs.length > 0
      ? `${filteredJobs.length} opportunit${filteredJobs.length !== 1 ? 'ies' : 'y'} waiting for you`
      : "No matching jobs found — try a different keyword"
    }
  </p>
</div>

          <div className="flex items-center gap-3">
            {searchedQuery && (
              <button
                onClick={() => dispatch(setSearchedQuery(""))}
                className="flex items-center gap-1.5 text-xs text-red-400 border border-red-400/30 px-3 py-1.5 rounded-full hover:bg-red-400/10 transition"
              >
                <X size={12} /> Clear filter
              </button>
            )}
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2 text-sm text-gray-300 border border-white/10 px-4 py-2 rounded-full hover:border-purple-500/50 hover:text-purple-300 transition lg:hidden"
            >
              <SlidersHorizontal size={14} /> Filters
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* Filter sidebar */}
          <div className={`lg:w-1/5 w-full ${showFilter ? 'block' : 'hidden'} lg:block`}>
            <FilterCard />
          </div>

          {/* Job grid */}
          <div className="flex-1 h-[calc(100vh-180px)] overflow-y-auto pb-8 pr-1">
            {filteredJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                  <SlidersHorizontal size={24} className="text-purple-400" />
                </div>
                <p className="text-white font-semibold text-lg">No jobs found</p>
                <p className="text-gray-500 text-sm mt-1">Try a different keyword or clear the filter</p>
                <button
                  onClick={() => dispatch(setSearchedQuery(""))}
                  className="mt-4 text-xs text-purple-400 border border-purple-400/30 px-4 py-2 rounded-full hover:bg-purple-400/10 transition"
                >
                  Clear filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredJobs.map((job) => (
                  <Job key={job._id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;