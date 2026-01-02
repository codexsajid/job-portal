import React from 'react'
import LastestJobsCard from './LastestJobsCard'
import { useSelector } from 'react-redux'


// const card = [0, 1, 2, 3, 4, 5, 6, 7, 8]
const LatestJobs = () => {
   
    const { allJobs } = useSelector(store => store.job)
    return (
        <div className='max-w-6xl m-auto my-10'>
            <h1 className='text-3xl font-bold'><span className='text-purple-600'>Latest & Top</span> Job Openings</h1>
            <div className='grid grid-cols-3 gap-4 my-6'>
                {
                    allJobs.length <= 0 ? <span>NA</span> : allJobs.map((job) => <LastestJobsCard key={job._id} job={job} />)
                }
            </div>
        </div>
    )
}

export default LatestJobs