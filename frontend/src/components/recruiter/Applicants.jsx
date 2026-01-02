import React from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { useSelector } from 'react-redux'

const Applicants = () => {
    const { applicants } = useSelector((store) => store.application)
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl m-auto'>
                <h1 className='font-bold text-xl my-5'>Applicants ({applicants?.applications?.length})</h1>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants