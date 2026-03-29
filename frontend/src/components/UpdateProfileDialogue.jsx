import React, { useState } from 'react';
import { setUser } from "../redux/authSlice.js"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Loader2, User, Mail, Phone, FileText, Image, Upload, Briefcase } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_ENDPOINT } from '../utils/constant';

const UpdateProfileDialogue = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio: user?.profile?.bio || '',
    skills: Array.isArray(user?.profile?.skills)
      ? user.profile.skills.join(', ')
      : user?.profile?.skills || '',
    file: null,
    photo: null,
  });

  const [resumeName, setResumeName] = useState('');
  const [photoName, setPhotoName] = useState('');
  const [photoPreview, setPhotoPreview] = useState(user?.profile?.avatarUrl || null);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    setInput({ ...input, file });
    setResumeName(file?.name || '');
  };

  const photoChangeHandler = (e) => {
    const photo = e.target.files[0];
    setInput({ ...input, photo });
    setPhotoName(photo?.name || '');
    if (photo) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(photo);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) formData.append("file", input.file);
    if (input.photo) formData.append("photo", input.photo);

    try {
      const res = await axios.put(`${USER_API_ENDPOINT}/profile/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: "Full Name", name: "fullname", placeholder: "John Doe", icon: <User size={14} /> },
    { label: "Email", name: "email", placeholder: "you@example.com", icon: <Mail size={14} /> },
    { label: "Phone", name: "phoneNumber", placeholder: "+91 98765 43210", icon: <Phone size={14} /> },
    { label: "Bio", name: "bio", placeholder: "Tell us about yourself", icon: <FileText size={14} /> },
    { label: "Skills", name: "skills", placeholder: "React, Node.js, MongoDB...", icon: <Briefcase size={14} /> },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-[#0f0a1e] border border-white/10 text-white rounded-2xl p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-white/10">
          <DialogTitle className="text-white font-bold text-lg">Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={submitHandler} className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">

          {/* Profile photo preview + upload */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl border border-purple-500/30 overflow-hidden bg-purple-600/20 flex items-center justify-center shrink-0">
              {photoPreview ? (
                <img src={photoPreview} alt="preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-purple-300 font-bold text-xl">
                  {user?.fullname?.charAt(0) || 'U'}
                </span>
              )}
            </div>
            <label className="flex items-center gap-2 text-xs text-gray-400 border border-white/10 px-4 py-2 rounded-xl cursor-pointer hover:border-purple-500/40 hover:text-purple-300 transition">
              <Image size={13} />
              {photoName || "Change Photo"}
              <input
                type="file"
                accept="image/*"
                onChange={photoChangeHandler}
                className="hidden"
              />
            </label>
          </div>

          {/* Text fields */}
          {fields.map(({ label, name, placeholder, icon }) => (
            <div key={name}>
              <label className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1.5 block">
                {label}
              </label>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus-within:border-purple-500/50 transition">
                <span className="text-gray-500 shrink-0">{icon}</span>
                <input
                  type="text"
                  name={name}
                  value={input[name]}
                  onChange={changeEventHandler}
                  placeholder={placeholder}
                  className="bg-transparent text-white text-sm flex-1 focus:outline-none placeholder-gray-600"
                />
              </div>
            </div>
          ))}

          {/* Resume upload */}
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1.5 block">
              Resume (PDF)
            </label>
            <label className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 cursor-pointer hover:border-purple-500/40 transition">
              <Upload size={14} className="text-gray-500 shrink-0" />
              <span className="text-sm text-gray-500 truncate">
                {resumeName || "Click to upload PDF"}
              </span>
              <input
                type="file"
                accept="application/pdf"
                onChange={fileChangeHandler}
                className="hidden"
              />
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#a855f7] text-white font-semibold text-sm hover:opacity-90 transition flex items-center justify-center gap-2 mt-2"
          >
            {loading && <Loader2 size={15} className="animate-spin" />}
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialogue;