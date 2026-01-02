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
            <div className='max-w-5xl my-10 mx-auto'>
                <div className='text-right mb-8'>
                    <Button className={"w-fit cursor-pointer"} onClick={() => navigate("/admin/companies/create")}>New Company</Button>
                </div>
                <CompaniesTable />
            </div>
        </div>
    )
}

export default Companies