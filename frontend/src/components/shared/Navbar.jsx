import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { LogOut, User2 } from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_ENDPOINT } from '../../utils/constant';
import { setUser } from '../../redux/authSlice';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
        navigate('/');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Logout failed.');
    }
  };

  return (
    <nav className="bg-[#0a0614] border-b border-white/5 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">

        {/* Logo */}
        <Link to="/">
          <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#6A38C2]">
            JobHunt
          </h1>
        </Link>

        {/* Nav links + actions */}
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {user && user.role === 'recruiter' ? (
              <>
                <li>
                  <Link to="/admin/companies" className="text-gray-400 hover:text-white transition">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="text-gray-400 hover:text-white transition">
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-white transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="text-gray-400 hover:text-white transition">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/Browse" className="text-gray-400 hover:text-white transition">
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm text-gray-300 border border-white/10 px-4 py-1.5 rounded-xl hover:border-purple-500/50 hover:text-white transition"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="text-sm text-white bg-gradient-to-r from-[#6A38C2] to-[#a855f7] px-4 py-1.5 rounded-xl hover:opacity-90 transition"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer w-9 h-9 rounded-full border-2 border-purple-500/40 hover:border-purple-400 transition">
                  <AvatarImage
                    src={user?.profile?.avatarUrl || 'https://github.com/shadcn.png'}
                    alt={user?.fullname || 'User'}
                    className="w-full h-full object-cover rounded-full"
                  />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-64 p-4 rounded-2xl shadow-xl bg-[#0f0a1e] border border-white/10 space-y-3 mt-2">
                {/* User info */}
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 rounded-xl border border-purple-500/30">
                    <AvatarImage
                      src={user?.profile?.avatarUrl || 'https://github.com/shadcn.png'}
                      alt={user?.fullname || 'User'}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-sm text-white">{user?.fullname}</h4>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {user?.profile?.bio || 'No bio available.'}
                    </p>
                  </div>
                </div>

                <hr className="border-white/10" />

                <div className="flex flex-col gap-1 text-sm">
                  {user.role === 'student' && (
                    <Link
                      to="/Profile"
                      className="flex items-center gap-2 text-gray-400 hover:text-white px-2 py-1.5 rounded-lg hover:bg-white/5 transition"
                    >
                      <User2 size={15} />
                      View Profile
                    </Link>
                  )}
                  <button
                    onClick={logoutHandler}
                    className="flex items-center gap-2 text-gray-400 hover:text-red-400 px-2 py-1.5 rounded-lg hover:bg-red-500/5 transition w-full text-left"
                  >
                    <LogOut size={15} />
                    Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;