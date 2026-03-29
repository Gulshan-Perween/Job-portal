import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { useSelector, useDispatch } from 'react-redux';
import { CalendarDays, Building2, Briefcase } from 'lucide-react';
import axios from 'axios';
import { APPLICATION_API_ENDPOINT } from '@/utils/constant';
import { setAllAppliedJobs } from '@/redux/jobSlice';

const AppliedJobTable = () => {
  const { allAppliedJobs = [] } = useSelector(store => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
  const fetchAppliedJobs = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`, {
        withCredentials: true
      });
      if (res.data.success) {
        // ✅ 'applications' hai, 'application' nahi
        dispatch(setAllAppliedJobs(res.data.applications));
      }
    } catch (error) {
      // ✅ 404 = no applications, crash mat karo
      if (error.response?.status === 404) {
        dispatch(setAllAppliedJobs([]));
      } else {
        console.log(error);
      }
    }
  };
  fetchAppliedJobs();
}, []);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'accepted': return 'bg-green-500/10 text-green-400 border border-green-500/20';
      case 'rejected': return 'bg-red-500/10 text-red-400 border border-red-500/20';
      default: return 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20';
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10">
        <h2 className="text-white font-bold text-lg">Applied Jobs</h2>
        <p className="text-gray-500 text-xs mt-0.5">
          {allAppliedJobs.length} application{allAppliedJobs.length !== 1 ? 's' : ''} submitted
        </p>
      </div>

      {allAppliedJobs.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <Briefcase size={32} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">No applications yet</p>
          <p className="text-xs mt-1">Start applying to jobs to see them here</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-gray-400 text-xs uppercase tracking-widest font-semibold">
                <span className="flex items-center gap-1.5"><CalendarDays size={12} /> Date</span>
              </TableHead>
              <TableHead className="text-gray-400 text-xs uppercase tracking-widest font-semibold">
                <span className="flex items-center gap-1.5"><Briefcase size={12} /> Role</span>
              </TableHead>
              <TableHead className="text-gray-400 text-xs uppercase tracking-widest font-semibold">
                <span className="flex items-center gap-1.5"><Building2 size={12} /> Company</span>
              </TableHead>
              <TableHead className="text-gray-400 text-xs uppercase tracking-widest font-semibold text-right">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allAppliedJobs.map((item, index) => (
              <TableRow key={index} className="border-white/5 hover:bg-white/5 transition">
                <TableCell className="text-gray-400 text-sm">
                  {item?.createdAt ? new Date(item.createdAt).toLocaleDateString('en-GB') : 'N/A'}
                </TableCell>
                <TableCell className="text-white font-medium text-sm">
                  {item?.job?.title || 'N/A'}
                </TableCell>
                <TableCell className="text-gray-400 text-sm">
                  {item?.job?.company?.name || 'N/A'}
                </TableCell>
                <TableCell className="text-right">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusStyle(item?.status)}`}>
                    {item?.status || 'Pending'}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AppliedJobTable;