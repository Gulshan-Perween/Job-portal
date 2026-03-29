import React from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useSelector } from 'react-redux';

const Browse = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="min-h-screen bg-[#0f0a1e]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-purple-400 text-xs uppercase tracking-widest mb-2">Explore</p>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            All <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#6A38C2]">Available</span> Jobs
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            {allJobs.length} opportunit{allJobs.length !== 1 ? 'ies' : 'y'} available right now
          </p>
        </div>

        {/* Grid */}
        {allJobs.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg font-medium text-white">No jobs available</p>
            <p className="text-sm mt-1">Check back later for new openings</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {allJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;