import React from 'react'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'

const LastestJobsCard = ({ job }) => {
    const navigate = useNavigate()
    return (
        <div className='border border-gray-100 p-4 rounded-md shadow-xl bg-white cursor-pointer' onClick={() => navigate(`/job/description/${job._id}`)}>
            <div>
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>{job?.company?.location}</p>
            </div>
            <div>
                <h1 className='font-bold text-lg'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description.substring(0, 80)}....</p>
            </div>
            <div className='flex items-center gap-2 mt-3'>
                <Badge className={"text-blue-700 font-bold"} variant="ghost">{job?.position} Position</Badge>
                <Badge className={"text-red-600 font-bold"} variant="ghost">{job?.jobType}</Badge>
                <Badge className={"text-purple-600 font-bold"} variant="ghost">{job?.salary}LPA</Badge>
            </div>
        </div>
    )
}

export default LastestJobsCard