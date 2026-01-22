import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_END_POINT_URL } from '../utiles/urls'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from "../redux/companySlice.js"

const CreateCompany = () => {
    const navigate = useNavigate()
    const [companyName, setCompanyName] = useState()
    const dispatch = useDispatch()
    const registerCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_END_POINT_URL}/createCompany`, { companyName }, { withCredentials: true })
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.data))
                toast.success(res?.data?.message)
                const companyId = res.data?.data._id
                navigate(`/admin/companies/${companyId}`)

            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message)
        }
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-3xl mx-auto my-6 sm:my-10 px-3 sm:px-4 md:px-6'>
                <div className='my-6 sm:my-8'>
                    <h1 className='font-bold text-lg sm:text-2xl md:text-3xl'>Your Company Name</h1>
                    <p className='text-gray-500 text-xs sm:text-sm md:text-base mt-2 sm:mt-3'>What would you like to give your company name? you can change the company name later also.</p>
                </div>
                <div>
                    <Label className={"font-bold"}>Company Name</Label>
                    <Input
                        type={"text"}
                        placeholder="JobHunt, Microsoft etc."
                        onChange={(e) => setCompanyName(e.target.value)}
                        className={"my-2 border border-black"}
                    />
                </div>
                <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 my-6 sm:my-8'>
                    <Button onClick={() => navigate("/admin/companies")} variant='outline' className={"cursor-pointer w-full sm:w-auto"}>Cancel</Button>
                    <Button className={"cursor-pointer w-full sm:w-auto"} onClick={() => registerCompany()}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CreateCompany