import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job);

  return (
    <section className="bg-[#0f0a1e] py-16 px-4 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-purple-400 text-sm font-medium mb-1 uppercase tracking-widest">Fresh Listings</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Latest Openings</h2>
          </div>
          <span className="text-gray-500 text-sm">{allJobs?.length || 0} jobs available</span>
        </div>

        {allJobs?.length <= 0 ? (
          <p className="text-gray-500 text-center py-16">No jobs available right now.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {allJobs.slice(0, 6).map((job) => (
              <LatestJobCards key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default LatestJobs