import React from 'react'
import Navbar from './shared/Navbar'
import { useSelector } from 'react-redux'
import JobCards from './shared/JobCards'
import useGetSavedJobs from './hook/useGetSavedJobs'

const SavedJobs = () => {
    useGetSavedJobs()
    const { savedJobs } = useSelector((store) => store.job)

    return (
        <div>
            <Navbar />
            <div className="w-full bg-background min-h-screen">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
                    <div className="bg-card border border-border rounded-lg shadow-sm p-4 sm:p-6">
                        <h2 className="font-bold text-lg sm:text-xl mb-4">Saved Jobs</h2>
                        {savedJobs.length === 0 ? (
                            <div className="text-center py-10 text-muted-foreground">
                                You haven't saved any jobs yet.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {savedJobs.map((job) => (
                                    <JobCards key={job._id} job={job} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SavedJobs
