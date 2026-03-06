import React, { useMemo, useState } from 'react'
import Navbar from './shared/Navbar'
import JobCards from './shared/JobCards'
import useGetAllJobs from './hook/useGetAllJobs'
import { useSelector } from 'react-redux'

const Browse = () => {
    useGetAllJobs()
    const { allJobs } = useSelector((store) => store.job)
    const [search, setSearch] = useState('')

    const filteredJobs = useMemo(() => {
        if (!search) return allJobs
        const lowerSearch = search.toLowerCase()
        return allJobs.filter((job) => {
            return (
                job?.title?.toLowerCase().includes(lowerSearch) ||
                job?.description?.toLowerCase().includes(lowerSearch) ||
                job?.location?.toLowerCase().includes(lowerSearch)
            )
        })
    }, [allJobs, search])

    const resultText = useMemo(() => {
        if (!search) return `Showing ${filteredJobs.length} job${filteredJobs.length === 1 ? '' : 's'}`
        return `Showing ${filteredJobs.length} result${filteredJobs.length === 1 ? '' : 's'} for "${search}"`
    }, [filteredJobs.length, search])

    return (
        <div>
            <Navbar />
            <div className='w-full bg-background min-h-screen max-w-6xl m-auto px-4 sm:px-6'>
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6'>
                    <div>
                        <h1 className='font-bold text-lg sm:text-xl md:text-2xl'>Browse Jobs</h1>
                        <p className='text-sm text-muted-foreground'>{resultText}</p>
                    </div>

                    <div className='w-full sm:w-80'>
                        <input
                            className='w-full border border-border rounded-lg bg-card text-card-foreground px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder='Search by title or description...'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5 mt-4'>
                    {filteredJobs.length <= 0 ? (
                        <div className='col-span-full text-center text-sm text-muted-foreground'>No jobs found.</div>
                    ) : (
                        filteredJobs.map((job) => <JobCards key={job._id} job={job} />)
                    )}
                </div>
            </div>


        </div>
    )
}

export default Browse