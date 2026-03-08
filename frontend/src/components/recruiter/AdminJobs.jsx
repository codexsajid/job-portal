import React from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import AdminJobsTable from './AdminJobsTable'
import useGetAdminAllJobs from '../hook/useGetAdminAllJobs'

const AdminJobs = () => {
    useGetAdminAllJobs()
    const navigate = useNavigate()
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl my-6 sm:my-10 mx-auto px-3 sm:px-4 md:px-6 lg:px-8'>
                <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8'>
                    <h1 className='text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-foreground'>My Jobs</h1>
                    <Button className="w-full sm:w-fit cursor-pointer bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-md hover:opacity-90 transition-opacity" onClick={() => navigate("/admin/job/create")}>+ New Job</Button>
                </div>
                <div className="bg-card rounded-xl shadow-sm border border-border/50 overflow-hidden">
                    <AdminJobsTable />
                </div>
            </div>
        </div>
    )
}

export default AdminJobs