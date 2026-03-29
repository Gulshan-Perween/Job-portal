import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_ENDPOINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import {
  MapPin, Briefcase, IndianRupee, Clock,
  Users, CalendarDays, GraduationCap, CheckCircle2
} from 'lucide-react';

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const [isApplied, setIsApplied] = useState(false);

  const applyJobHandler = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setIsApplied(true);
        const updatedJob = {
          ...singleJob,
          applications: [
            ...(singleJob?.applications || []),
            { applicant: { _id: user?._id } }
          ]
        };
        dispatch(setSingleJob(updatedJob));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          const applications = res.data.job?.applications || [];
          const alreadyApplied = applications.some(
            (app) => app?.applicant?._id === user?._id
          );
          setIsApplied(alreadyApplied);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const details = [
    { icon: <MapPin size={15} />, label: "Location", value: singleJob?.location },
    { icon: <Briefcase size={15} />, label: "Job Type", value: singleJob?.jobType },
    { icon: <IndianRupee size={15} />, label: "Salary", value: singleJob?.salary ? `${singleJob.salary} LPA` : "N/A" },
    { icon: <GraduationCap size={15} />, label: "Experience", value: singleJob?.experience !== undefined ? `${singleJob.experience} yrs` : "N/A" },
    { icon: <Users size={15} />, label: "Positions", value: singleJob?.position || "N/A" },
    { icon: <Users size={15} />, label: "Applicants", value: singleJob?.applications?.length || 0 },
    { icon: <CalendarDays size={15} />, label: "Posted On", value: singleJob?.createdAt ? new Date(singleJob.createdAt).toLocaleDateString('en-GB') : "N/A" },
  ];

  return (
    <div className="min-h-screen bg-[#0f0a1e]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Header card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              {/* Company avatar + name */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/20 flex items-center justify-center text-purple-300 font-bold text-lg">
                  {singleJob?.company?.name?.charAt(0) || "?"}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{singleJob?.company?.name}</p>
                  <p className="text-gray-500 text-xs flex items-center gap-1">
                    <MapPin size={10} /> {singleJob?.location}
                  </p>
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {singleJob?.title || "Job Title"}
              </h1>

              {/* Quick badges */}
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {singleJob?.position} Positions
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  {singleJob?.jobType || "N/A"}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  {singleJob?.salary || "N/A"} LPA
                </span>
              </div>
            </div>

            {/* Apply button */}
            <button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition ${
                isApplied
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#6A38C2] to-[#a855f7] text-white hover:opacity-90'
              }`}
            >
              {isApplied && <CheckCircle2 size={16} />}
              {isApplied ? 'Already Applied' : 'Apply Now'}
            </button>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
          {details.map((d, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-1">
                {d.icon} {d.label}
              </div>
              <p className="text-white text-sm font-semibold">{d.value}</p>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-bold text-lg mb-4 pb-3 border-b border-white/10">
            Job Description
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            {singleJob?.description || "No description provided."}
          </p>
        </div>

      </div>
    </div>
  );
};

export default JobDescription;