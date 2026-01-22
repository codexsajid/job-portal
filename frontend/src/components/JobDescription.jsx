import { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { APPLICANT_END_POINT_URL, JOB_END_POINT_URL } from './utiles/urls'
import { setSingleJob } from './redux/jobSlice'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)
    const navigate = useNavigate()
    const isIntiallyApplied = singleJob?.applications?.some(
        application => application.applicant === user?._id
    ) || false;

    const [isApplied, setIsApplied] = useState(isIntiallyApplied);
    const [loading, setLoading] = useState(false)


    const param = useParams()
    const jobId = param.id
    const dispatch = useDispatch()

    const applyJobHandler = async () => {
        try {
            setLoading(true);
            const res = await axios.post(
                `${APPLICANT_END_POINT_URL}/apply/${jobId}`, {}, { withCredentials: true }
            );
            if (res.data.success) {
                setIsApplied(true); // Update the local state
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        finally {
            setLoading(false);
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
        <div className='min-h-screen bg-gray-50'>
            {/* Back Button */}
            <div className='max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6'>
                <button
                    onClick={() => navigate(-1)}
                    className='flex items-center gap-2 text-blue-600 hover:text-blue-800 transition font-semibold text-sm sm:text-base'
                >
                    <ArrowLeft size={20} />
                    Back
                </button>
            </div>

            <div className='max-w-6xl mx-auto px-4 sm:px-6 my-6 sm:my-10 pb-24'>
                <div className='bg-white rounded-lg shadow-sm p-4 sm:p-6'>
                    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6'>
                        <div className='flex-1'>
                            <h1 className='font-bold text-xl sm:text-2xl md:text-3xl'>{singleJob?.title}</h1>
                            <div className='flex flex-wrap items-center gap-2 mt-4'>
                                <Badge className={"text-blue-700 font-bold text-xs sm:text-sm"} variant="ghost">{singleJob?.position} Position</Badge>
                                <Badge className={"text-red-600 font-bold text-xs sm:text-sm"} variant="ghost">{singleJob?.jobType}</Badge>
                                <Badge className={"text-purple-600 font-bold text-xs sm:text-sm"} variant="ghost">{singleJob?.salary}LPA</Badge>
                            </div>
                        </div>
                    </div>
                    <div >
                        <h1 className='my-5 border-b-2 border-b-gray-300 py-3 font-medium text-base sm:text-lg'>Job Description</h1>
                    </div>
                    <div className='space-y-2 text-xs sm:text-sm'>
                        <h1 className='font-bold my-1'>Role: <span className='pl-2 font-normal'>{singleJob?.title}</span></h1>
                        <h1 className='font-bold my-1'>Location: <span className='pl-2 font-normal'>{singleJob?.location}</span></h1>
                        <h1 className='font-bold my-1'>Description: <span className='pl-2 font-normal'>{singleJob?.description}</span></h1>
                        <h1 className='font-bold my-1'>Experience: <span className='pl-2 font-normal'>{singleJob?.experience} yrs</span></h1>
                        <h1 className='font-bold my-1'>Salary: <span className='pl-2 font-normal'>{singleJob?.salary}LPA</span></h1>
                        <h1 className='font-bold my-1'>Total Applicants: <span className='pl-2 font-normal'>{singleJob?.applications?.length}</span></h1>
                        <h1 className='font-bold my-1'>Post Date: <span className='pl-2 font-normal'>{singleJob?.createdAt.split("T")[0]}</span></h1>
                    </div>

                </div>
                {/* Apply Button */}
                <div className='mt-4 sm:mt-6'>
                    <Button
                        onClick={isApplied || loading ? null : applyJobHandler}
                        disabled={isApplied || loading}
                        className={`w-full sm:w-auto py-1.5 sm:py-2 md:py-3 px-3 sm:px-4 md:px-6 text-xs sm:text-sm md:text-base rounded-lg font-semibold flex items-center justify-center gap-2 ${isApplied ? 'bg-gray-600 cursor-not-allowed' : loading ? 'bg-purple-500 cursor-wait' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}
                    >
                        {loading && (
                            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        )}

                        {isApplied ? "Already Applied" : loading ? "Applying..." : "Apply Job"}
                    </Button>

                </div>
            </div>
        </div>
    )
}

export default JobDescription