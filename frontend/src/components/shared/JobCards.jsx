import { Bookmark } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'



const JobCards = ({ job }) => {
    const navigate = useNavigate()

    const dayAgoFunction = (mongoDBTime) => {
        const createdAt = new Date(mongoDBTime);
        const todayTime = new Date()
        const TimeDifference = todayTime - createdAt;
        return Math.floor(TimeDifference / (24 * 60 * 60 * 1000))
    }
    return (
        <div className='border border-gray-300 bg-white rounded-xl p-4 shadow-sm'>
            <div className='flex justify-between items-center'>
                <p className='text-sm text-gray-500'>{dayAgoFunction(job?.createdAt) == 0 ? "Today" : dayAgoFunction(job?.createdAt)} days ago</p>
                <Button variant='outline' className="rounded-full" size='icon'><Bookmark /></Button>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <Button variant='outline' size='icon' className="p-1">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg'>{job?.title}</h1>
                <p className='text-gray-600 text-sm'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-3'>
                <Badge className={"text-blue-700 font-bold"} variant="ghost">{job?.position} Position</Badge>
                <Badge className={"text-red-600 font-bold"} variant="ghost">{job?.jobType}</Badge>
                <Badge className={"text-purple-600 font-bold"} variant="ghost">{job?.salary}LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-3'>
                <Button onClick={() => navigate(`/job/description/${job._id}`)} variant='outline' className={"cursor-pointer"}>Details</Button>
                <Button className="bg-purple-800">Save For Later</Button>
            </div>
        </div>
    )
}

export default JobCards