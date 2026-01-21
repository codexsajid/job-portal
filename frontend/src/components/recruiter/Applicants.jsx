import React from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { useSelector } from 'react-redux'

const Applicants = () => {
    const { applicants } = useSelector((store) => store.application)
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
                <h1 className='font-bold text-xl sm:text-2xl my-5'>Applicants ({applicants?.applications?.length})</h1>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants