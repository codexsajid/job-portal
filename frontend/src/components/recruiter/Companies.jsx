import React from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '../hook/useGetAllCompanies'

const Companies = () => {
    useGetAllCompanies()
    const navigate = useNavigate()
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl my-10 mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8'>
                    <h1 className='text-2xl sm:text-3xl font-bold mb-4 sm:mb-0'>My Companies</h1>
                    <Button className={"w-full sm:w-fit cursor-pointer"} onClick={() => navigate("/admin/companies/create")}>+ New Company</Button>
                </div>
                <CompaniesTable />
            </div>
        </div>
    )
}

export default Companies