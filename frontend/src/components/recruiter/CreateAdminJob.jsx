import React, { useState } from 'react'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Navbar from '../shared/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { JOB_END_POINT_URL } from '../utiles/urls'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { toast } from 'sonner'



const CreateAdminJob = () => {
    const navigate = useNavigate()

    const { allCompany } = useSelector(store => store.company)
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        location: "",
        salary: "",
        experience: "",
        jobType: "",
        position: 0,
        companyId: ""
    })
    //title, description, requirements, location, salary, experience, jobType, position, companyId 


    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const selectChangeHandler = (value) => {
        const selectedCompany = allCompany.find((company) => company.name.toLowerCase() == value)
        setInput({ ...input, companyId: selectedCompany._id })
    }
    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post(`${JOB_END_POINT_URL}/postJob`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res?.data?.message)
                navigate('/admin/jobs')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message || "Something went wrong")
        }
        finally {
            setLoading(false)
        }

    }


    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto my-4 sm:my-6 p-3 sm:p-4 md:p-6 shadow-xl bg-white rounded-lg">
                <form onSubmit={submitHandler}>
                    <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
                        <Button
                            className="flex items-center text-gray-600 cursor-pointer w-fit"
                            variant="outline"
                            type="button"
                            onClick={() => navigate("/admin/jobs")}
                        >
                            <ArrowLeft className="mt-0.5" />
                            <span>Back</span>
                        </Button>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Post Job</h1>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                placeholder="Enter Job Title"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                placeholder="Enter Job description"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="requirements">Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                placeholder="Enter the Requirement"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="salary">Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                placeholder="Enter the Salary"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                placeholder="Enter the location"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="jobType">JobType</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                placeholder="Enter the JobType"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="experience">Experience</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                placeholder="How many you have experience"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="position">No of Position</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                            />
                        </div>
                        {
                            allCompany.length > 0 && (
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-180px">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                allCompany.map(company => {
                                                    return (
                                                        <SelectItem key={company._id} value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                                    )
                                                })
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }

                    </div>


                    <div className="mt-8 space-y-4">
                        {
                            loading ? <Button type="submit" className={`w-full`}><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button> : <Button type="submit" className={`w-full`}>Post New Job</Button>
                        }
                        {
                            allCompany.length === 0 && <p className='text-xs text-red-600 font-bold text-center'>*Please register a company first, before posting a job.</p>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateAdminJob