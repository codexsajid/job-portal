import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import JobCards from './shared/JobCards'
import FilterCard from './shared/FilterCard'
import { useSelector } from 'react-redux';
import useGetAllJobs from './hook/useGetAllJobs';
import { Menu, X } from 'lucide-react'

// const randomCard = [0, 1, 2, 3, 4, 5, 6, 7];
const Jobs = () => {
    useGetAllJobs()
    const { allJobs, searchQuery } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState(allJobs)
    const [showFilter, setShowFilter] = useState(false)

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
            <div className='w-full bg-gray-50'>
                <div className='max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6'>
                    {/* Filter Toggle Button - Mobile Only */}
                    <div className='lg:hidden mb-4'>
                        <button
                            onClick={() => setShowFilter(!showFilter)}
                            className='flex items-center gap-1 px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm sm:text-base'
                        >
                            {showFilter ? (
                                <>
                                    <X size={20} />
                                    <span>Close Filter</span>
                                </>
                            ) : (
                                <>
                                    <Menu size={20} />
                                    <span>Show Filter</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Mobile Filter Card - Shows inline when toggled */}
                    {showFilter && (
                        <div className='lg:hidden mb-4 bg-white rounded-lg shadow-md p-4'>
                            <FilterCard />
                        </div>
                    )}

                    <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6'>
                        {/* Filter Sidebar - Desktop Only */}
                        <div className='hidden lg:block col-span-1'>
                            <div className='sticky top-20 bg-white rounded-lg shadow-sm'>
                                <FilterCard />
                            </div>
                        </div>

                        {/* Jobs Grid */}
                        <div className='col-span-1 lg:col-span-3'>
                            {
                                filterJobs.length <= 0 ? (
                                    <div className='flex items-center justify-center h-96'>
                                        <span className='text-sm sm:text-base text-gray-500'>Job Not Found</span>
                                    </div>
                                ) : (
                                    <div className='space-y-4'>
                                        <p className='text-xs sm:text-sm text-gray-600'>Showing {filterJobs.length} jobs</p>
                                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
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
            </div>

        </div>
    )
}

export default Jobs