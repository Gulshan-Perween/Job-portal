import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { Contact, Pen, Mail, FileText, ExternalLink } from 'lucide-react';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialogue from './UpdateProfileDialogue';
import { useSelector } from 'react-redux';

const Profile = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="min-h-screen bg-[#0f0a1e]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">

        {/* Profile card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">

          {/* Top row */}
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-5">
              <Avatar className="h-20 w-20 rounded-2xl border border-purple-500/30 shrink-0">
                <AvatarImage
                  src={user?.profile?.avatarUrl || 'https://github.com/shadcn.png'}
                  alt={user?.fullname || 'User'}
                  className="object-cover rounded-2xl"
                />
                <AvatarFallback className="bg-purple-600/20 text-purple-300 text-xl font-bold rounded-2xl">
                  {user?.fullname?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {user?.fullname || 'Unnamed User'}
                </h1>
                <p className="text-gray-400 text-sm mt-1 max-w-md leading-relaxed">
                  {user?.profile?.bio || <span className="italic text-gray-600">No bio provided.</span>}
                </p>
              </div>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 text-xs text-gray-400 border border-white/10 px-4 py-2 rounded-xl hover:border-purple-500/50 hover:text-purple-300 transition"
            >
              <Pen size={13} /> Edit Profile
            </button>
          </div>

          <hr className="border-white/10 my-6" />

          {/* Contact info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
              <Mail size={15} className="text-purple-400 shrink-0" />
              <span className="text-gray-300 text-sm truncate">{user?.email || 'No email'}</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
              <Contact size={15} className="text-purple-400 shrink-0" />
              <span className="text-gray-300 text-sm">{user?.phoneNumber || 'No phone number'}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h2 className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(user?.profile?.skills) && user.profile.skills.length > 0 ? (
                user.profile.skills.map((item, index) => (
                  <span
                    key={index}
                    className="text-xs px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-medium"
                  >
                    {item}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-600 italic">No skills listed.</span>
              )}
            </div>
          </div>

          {/* Resume */}
          <div>
            <h2 className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-3">Resume</h2>
            {user?.profile?.resumeUrl ? (
              
                <a href={user.profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-purple-400 border border-purple-500/20 bg-purple-500/10 px-4 py-2 rounded-xl hover:bg-purple-500/20 transition"
              >
                <FileText size={14} />
                View Resume
                <ExternalLink size={12} />
              </a>
            ) : (
              <span className="text-sm text-gray-600 italic">No resume uploaded.</span>
            )}
          </div>
        </div>

        {/* Applied Jobs */}
        <AppliedJobTable />

      </div>

      <UpdateProfileDialogue open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;