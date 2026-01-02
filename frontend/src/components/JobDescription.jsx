import { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { APPLICANT_END_POINT_URL, JOB_END_POINT_URL } from './utiles/urls'
import { setSingleJob } from './redux/jobSlice'
import { toast } from 'sonner'

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)
    const isIntiallyApplied = singleJob?.applications?.some(
        application => application.applicant === user?._id
    ) || false;

    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const param = useParams()
    const jobId = param.id
    const dispatch = useDispatch()

    const applyJobHandler = async () => {
        try {
            const res = await axios.post(
                `${APPLICANT_END_POINT_URL}/apply/${jobId}`, {}, { withCredentials: true }
            );
            if (res.data.success) {
                console.log(res)
                setIsApplied(true); // Update the local state
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_END_POINT_URL}/getJobById/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response?.data?.message || "Something went wrong");
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);



    return (
        <div className='max-w-6xl m-auto my-10 p-5'>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='font-bold text-2xl'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={"text-blue-700 font-bold"} variant="ghost">{singleJob?.position} Position</Badge>
                        <Badge className={"text-red-600 font-bold"} variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className={"text-purple-600 font-bold"} variant="ghost">{singleJob?.salary}LPA</Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>


            </div>
            <div >
                <h1 className='my-5 border-b-2 border-b-gray-300 py-3 font-medium'>Job Description</h1>
            </div>
            <div>
                <h1 className='font-bold my-1'>Role: <span className='pl-2 font-normal'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-2 font-normal'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-2 font-normal'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-2 font-normal'>{singleJob?.experience} yrs</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-2 font-normal'>{singleJob?.salary}LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-2 font-normal'>{singleJob?.applications?.length}</span></h1>
                <h1 className='font-bold my-1'>Post Date: <span className='pl-2 font-normal'>{singleJob?.createdAt.split("T")[0]}</span></h1>
            </div>

        </div>
    )
}

export default JobDescription