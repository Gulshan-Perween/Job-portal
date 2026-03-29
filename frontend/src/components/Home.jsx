import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Job from './Job'

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const { allJobs } = useSelector((store) => store.job);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate('/admin/companies');
    }
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setHasSearched(true);

    if (!query.trim()) {
      setFilteredJobs([]);
      setHasSearched(false);
      return;
    }

    const q = query.toLowerCase();
    const results = allJobs.filter((job) =>
      job.title?.toLowerCase().includes(q) ||
      job.description?.toLowerCase().includes(q) ||
      job.location?.toLowerCase().includes(q) ||
      job.jobType?.toLowerCase().includes(q) ||
      job.salary?.toString().toLowerCase().includes(q)
    );
    setFilteredJobs(results);
  };

  return (
    <div>
      <Navbar />
      <HeroSection onSearch={handleSearch} />

      {hasSearched && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-4 text-sm text-gray-600">
            Showing results for{' '}
            <span className="font-semibold text-[#6A38C2]">"{searchQuery}"</span>
            {' '}— {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
          </div>

          {filteredJobs.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <p className="text-lg">No jobs found for "{searchQuery}"</p>
              <p className="text-sm mt-1">Try a different keyword</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <Job key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>
      )}

      {!hasSearched && (
        <>
          <CategoryCarousel onCategorySelect={handleSearch} /> {/* ✅ yeh add kiya */}
          <LatestJobs />
        </>
      )}

      <Footer />
    </div>
  );
}

export default Home;