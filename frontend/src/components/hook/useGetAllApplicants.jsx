import axios from 'axios';
import { useEffect } from 'react';
import { APPLICANT_END_POINT_URL } from '../utiles/urls';
import { useDispatch } from 'react-redux';
import { setApplicants } from '../redux/applicationSlice';

const useGetAllApplicants = (jobId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICANT_END_POINT_URL}/${jobId}/applicants`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setApplicants(res.data.job.applications || []));
                }
            } catch (error) {
                console.log("Fetch Applicants Error:", error);
            }
        };

        if (jobId) fetchApplicants();
    }, [jobId, dispatch]);
};

export default useGetAllApplicants;
