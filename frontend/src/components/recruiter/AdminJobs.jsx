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
            <div className='max-w-5xl my-10 mx-auto'>
                <div className='text-right mb-8'>
                    <Button className={"w-fit cursor-pointer"} onClick={() => navigate("/admin/job/create")}>New Job</Button>
                </div>
                <AdminJobsTable />
            </div>
        </div>
    )
}

export default AdminJobs