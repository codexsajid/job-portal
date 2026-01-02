import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import JobCards from './shared/JobCards'
import FilterCard from './shared/FilterCard'
import { useSelector } from 'react-redux';
import useGetAllJobs from './hook/useGetAllJobs';

// const randomCard = [0, 1, 2, 3, 4, 5, 6, 7];
const Jobs = () => {
    useGetAllJobs()
    const { allJobs, searchQuery } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState(allJobs)

    useEffect(() => {
        if (searchQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchQuery])
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl m-auto mt-5 flex'>
                <div className='w-[18%]'>
                    <FilterCard />
                </div>
                <div className='flex gap-5 w-full'>
                    {
                        filterJobs.length <= 0 ? <span>Job Not Found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => <JobCards key={job._id} job={job} />)
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default Jobs