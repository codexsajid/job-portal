import { Bookmark, X } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setSavedJobs } from '../redux/jobSlice'
import axios from 'axios'
import { USER_END_POINT_URL } from '../utiles/urls'
import { toast } from 'sonner'



const JobCards = ({ job }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { savedJobs } = useSelector((store) => store.job)

    const dayAgoFunction = (mongoDBTime) => {
        const createdAt = new Date(mongoDBTime);
        const todayTime = new Date()
        const TimeDifference = todayTime - createdAt;
        return Math.floor(TimeDifference / (24 * 60 * 60 * 1000))
    }

    const isSaved = savedJobs.some((saved) => saved._id === job._id)

    const toggleSave = async () => {
        try {
            if (isSaved) {
                const res = await axios.delete(`${USER_END_POINT_URL}/saved-jobs/${job._id}`, {
                    withCredentials: true,
                })
                if (res.data.success) {
                    dispatch(setSavedJobs(res.data.jobs))
                    toast.success('Removed from saved jobs')
                }
            } else {
                const res = await axios.post(`${USER_END_POINT_URL}/saved-jobs/${job._id}`, {}, {
                    withCredentials: true,
                })
                if (res.data.success) {
                    dispatch(setSavedJobs(res.data.jobs))
                    toast.success('Saved for later')
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Something went wrong')
        }
    }

    return (
        <div className='border border-border bg-card rounded-xl p-3 sm:p-4 shadow-sm'>
            <div className='flex justify-between items-center'>
                <p className='text-xs sm:text-sm text-muted-foreground'>{dayAgoFunction(job?.createdAt) == 0 ? "Today" : dayAgoFunction(job?.createdAt)} days ago</p>
                <Button
                    variant={isSaved ? 'secondary' : 'outline'}
                    className="rounded-full"
                    size='icon'
                    onClick={toggleSave}
                    title={isSaved ? 'Remove saved job' : 'Save job for later'}
                >
                    {isSaved ? <X size={16} /> : <Bookmark size={16} />}
                </Button>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <Button variant='outline' size='icon' className="p-1">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-sm sm:text-base'>{job?.company?.name}</h1>
                    <p className='text-xs sm:text-sm text-muted-foreground'>India</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-base sm:text-lg'>{job?.title}</h1>
                <p className='text-muted-foreground text-xs sm:text-sm'>{job?.description.substring(0, 80)}....</p>
            </div>
            <div className='flex items-center gap-2 mt-3'>
                <Badge className={"text-blue-700 font-bold"} variant="ghost">{job?.position} Position</Badge>
                <Badge className={"text-red-600 font-bold"} variant="ghost">{job?.jobType}</Badge>
                <Badge className={"text-purple-600 font-bold"} variant="ghost">{job?.salary}LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-3'>
                <Button onClick={() => navigate(`/job/description/${job._id}`)} variant='outline' className={"cursor-pointer"}>Details</Button>
                <Button onClick={toggleSave} className="bg-purple-800">
                    {isSaved ? 'Remove' : 'Save For Later'}
                </Button>
            </div>
        </div>
    )
}

export default JobCards