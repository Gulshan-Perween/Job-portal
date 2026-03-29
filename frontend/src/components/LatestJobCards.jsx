import React from 'react';
import { MapPin, Briefcase, IndianRupee, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job?._id}`)}
      className="group relative bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-purple-500/40 hover:bg-white/8 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Top right arrow */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition">
        <ArrowUpRight size={16} className="text-purple-400" />
      </div>

      {/* Company */}
      <div className="mb-4">
        <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/20 flex items-center justify-center text-purple-300 font-bold text-sm mb-3">
          {job?.company?.name?.charAt(0) || "?"}
        </div>
        <h2 className="text-white font-semibold text-sm">{job?.company?.name}</h2>
        <p className="text-gray-500 text-xs flex items-center gap-1 mt-0.5">
          <MapPin size={11} /> {job?.location}
        </p>
      </div>

      {/* Title & desc */}
      <h3 className="text-white font-bold text-base mb-1">{job?.title}</h3>
      <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">
        {job?.description}
      </p>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
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
    </div>
  );
};

export default LatestJobCards;