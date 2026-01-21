import React from 'react'
import LastestJobsCard from './LastestJobsCard'
import { useSelector } from 'react-redux'


// const card = [0, 1, 2, 3, 4, 5, 6, 7, 8]
const LatestJobs = () => {

    const { allJobs } = useSelector(store => store.job)
    return (
        <div className='max-w-6xl m-auto my-8 sm:my-10 px-4 sm:px-6'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold'><span className='text-purple-600'>Latest & Top</span> Job Openings</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6'>
                {
                    allJobs.length <= 0 ? <span className='text-sm sm:text-base'>NA</span> : allJobs.map((job) => <LastestJobsCard key={job._id} job={job} />)
                }
            </div>
        </div>
    )
}

export default LatestJobs