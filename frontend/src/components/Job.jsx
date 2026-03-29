import React from 'react';
import { MapPin, Briefcase, IndianRupee, Clock, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
  const navigate = useNavigate();
  const jobId = job?._id;

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiff = currentTime - createdAt;
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-purple-500/40 hover:bg-white/8 transition-all duration-300 cursor-pointer overflow-hidden">

      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />

      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/20 flex items-center justify-center text-purple-300 font-bold text-sm shrink-0">
          {job?.company?.name?.charAt(0) || "?"}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Clock size={11} />
          {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)}d ago`}
        </div>
      </div>

      {/* Company & location */}
      <h2 className="text-gray-300 text-sm font-medium">{job?.company?.name}</h2>
      <p className="text-gray-500 text-xs flex items-center gap-1 mt-0.5 mb-3">
        <MapPin size={10} /> {job?.location}
      </p>

      {/* Title & desc */}
      <h1 className="text-white font-bold text-base mb-1 leading-snug">{job?.title}</h1>
      <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">
        {job?.description}
      </p>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <Briefcase size={10} /> {job?.jobType}
        </span>
        <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
          <IndianRupee size={10} /> {job?.salary} LPA
        </span>
        <span className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
          {job?.position} positions
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-white/5">
        <button
          onClick={() => navigate(`/description/${jobId}`)}
          className="flex-1 py-2 text-xs font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition flex items-center justify-center gap-1.5"
        >
          View Details <ArrowUpRight size={12} />
        </button>
        <button className="px-4 py-2 text-xs font-medium text-gray-400 border border-white/10 hover:border-purple-500/40 hover:text-purple-300 rounded-xl transition">
          Save
        </button>
      </div>
    </div>
  );
};

export default Job;