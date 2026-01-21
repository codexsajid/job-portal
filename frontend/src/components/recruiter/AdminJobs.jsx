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
            <div className='max-w-6xl my-10 mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8'>
                    <h1 className='text-2xl sm:text-3xl font-bold mb-4 sm:mb-0'>My Jobs</h1>
                    <Button className={"w-full sm:w-fit cursor-pointer"} onClick={() => navigate("/admin/job/create")}>+ New Job</Button>
                </div>
                <AdminJobsTable />
            </div>
        </div>
    )
}

export default AdminJobs