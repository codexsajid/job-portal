import React from 'react'
import Navbar from './shared/Navbar'
import JobCards from './shared/JobCards'
import { useSelector } from 'react-redux'

// const randomJobs = [1, 2, 3, 4, 5]
const Browse = () => {
    const { allJobs } = useSelector(store => store.job)
    return (
        <div>
            <Navbar />
            <div className='w-full max-w-6xl m-auto px-4 sm:px-6'>
                <h1 className='font-bold text-lg sm:text-xl md:text-2xl my-5'>Search Result ({allJobs?.length})</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5'>
                    {
                        allJobs.length <= 0 ? <span className='text-sm sm:text-base'>Job Not Available</span> : allJobs.map((job) => <JobCards key={job._id} job={job} />)
                    }
                </div>
            </div>


        </div>
    )
}

export default Browse