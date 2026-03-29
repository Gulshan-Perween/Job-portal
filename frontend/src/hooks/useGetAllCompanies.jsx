import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setCompanies } from '@/redux/companySlice';
import { COMPANY_API_END_POINT } from '@/utils/constant';

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.error('Failed to fetch companies:', error);
      }
    };

    fetchAllCompanies();
  }, [dispatch]);
};

export default useGetAllCompanies;
