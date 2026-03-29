import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_ENDPOINT, JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { ArrowLeft, Users, Mail, Phone, FileText, ExternalLink, CheckCircle, XCircle, Clock } from 'lucide-react';

const Applicants = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, { withCredentials: true });
        if (res.data.success) setJob(res.data.job);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const updateStatus = async (applicationId, status) => {
    try {
      const res = await axios.put(
        `${APPLICATION_API_ENDPOINT}/status/${applicationId}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(`Status updated to ${status}`);
        // Refresh
        setJob(prev => ({
          ...prev,
          applications: prev.applications.map(app =>
            app._id === applicationId ? { ...app, status } : app
          )
        }));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'accepted': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'rejected': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0a1e]">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/admin/jobs")}
            className="flex items-center gap-2 text-sm text-gray-400 border border-white/10 px-4 py-2 rounded-xl hover:border-purple-500/40 hover:text-purple-300 transition"
          >
            <ArrowLeft size={14} /> Back
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {job?.title || "Job"} — Applicants
            </h1>
            <p className="text-gray-500 text-xs mt-0.5">
              {job?.applications?.length || 0} application{job?.applications?.length !== 1 ? 's' : ''} received
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading...</div>
        ) : job?.applications?.length === 0 ? (
          <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl text-gray-500">
            <Users size={32} className="mx-auto mb-3 opacity-30" />
            <p className="text-white font-medium">No applicants yet</p>
            <p className="text-sm mt-1">Applications will appear here once candidates apply</p>
          </div>
        ) : (
          <div className="space-y-4">
            {job?.applications?.map((app) => (
              <div key={app._id} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-purple-500/20 transition">
                <div className="flex items-start justify-between gap-4 flex-wrap">

                  {/* Applicant info */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/20 flex items-center justify-center text-purple-300 font-bold text-lg shrink-0">
                      {app?.applicant?.fullname?.charAt(0) || "?"}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{app?.applicant?.fullname || "N/A"}</h3>
                      <div className="flex flex-wrap items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Mail size={11} /> {app?.applicant?.email || "N/A"}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Phone size={11} /> {app?.applicant?.phoneNumber || "N/A"}
                        </span>
                      </div>
                      {app?.applicant?.profile?.resumeUrl && (
                        
                          <a href={app.applicant.profile.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-purple-400 mt-1.5 hover:text-purple-300 transition"
                        >
                          <FileText size={11} /> View Resume <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Status + Actions */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`text-xs px-3 py-1 rounded-full border font-medium ${getStatusStyle(app.status)}`}>
                      {app.status || 'pending'}
                    </span>

                    {app.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateStatus(app._id, 'accepted')}
                          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 transition"
                        >
                          <CheckCircle size={13} /> Accept
                        </button>
                        <button
                          onClick={() => updateStatus(app._id, 'rejected')}
                          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition"
                        >
                          <XCircle size={13} /> Reject
                        </button>
                      </>
                    )}

                    <span className="text-xs text-gray-600">
                      <Clock size={10} className="inline mr-1" />
                      {new Date(app.createdAt).toLocaleDateString('en-GB')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Applicants;