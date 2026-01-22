import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Loader2 } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'
import { JOB_END_POINT_URL } from '../utiles/urls'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../ui/select'

const EditJob = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requirements: '',
        location: '',
        salary: '',
        experience: '',
        jobType: '',
        position: ''
    })

    // Fetch job details
    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                setFetching(true)
                const res = await axios.get(
                    `${JOB_END_POINT_URL}/getJobById/${id}`,
                    { withCredentials: true }
                )

                if (res.data.success) {
                    const job = res.data.job
                    setFormData({
                        title: job.title || '',
                        description: job.description || '',
                        requirements: job.requirements?.join(', ') || '',
                        location: job.location || '',
                        salary: job.salary || '',
                        experience: job.experience || '',
                        jobType: job.jobType || '',
                        position: job.position || ''
                    })
                }
            } catch (error) {
                console.log(error)
                toast.error(error?.response?.data?.message || "Failed to fetch job details")
                navigate('/admin/jobs')
            } finally {
                setFetching(false)
            }
        }

        fetchJobDetails()
    }, [id, navigate])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validation
        if (!formData.title || !formData.description || !formData.requirements ||
            !formData.location || !formData.salary || !formData.experience ||
            !formData.jobType || !formData.position) {
            toast.error("Please fill all fields")
            return
        }

        try {
            setLoading(true)

            const res = await axios.put(
                `${JOB_END_POINT_URL}/updateJob/${id}`,
                formData,
                { withCredentials: true }
            )

            if (res.data.success) {
                toast.success(res.data.message || "Job updated successfully")
                navigate('/admin/jobs')
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "Failed to update job")
        } finally {
            setLoading(false)
        }
    }

    if (fetching) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <Loader2 className='h-8 w-8 animate-spin' />
            </div>
        )
    }

    return (
        <div className='max-w-4xl mx-auto p-3 sm:p-4 md:p-8'>
            <div className='flex items-center gap-2 mb-4 sm:mb-6'>
                <ArrowLeft
                    className='cursor-pointer'
                    onClick={() => navigate('/admin/jobs')}
                />
                <h1 className='font-bold text-lg sm:text-xl'>Edit Job</h1>
            </div>

            <div className='border border-gray-200 rounded-lg shadow-sm p-4 sm:p-6 md:p-8'>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    {/* Job Title */}
                    <div>
                        <Label className={"mb-1 pl-1"}>Job Title</Label>
                        <Input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., Senior Frontend Developer"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <Label className={"mb-1 pl-1"}>Job Description</Label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe the job responsibilities..."
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                            required
                        />
                    </div>

                    {/* Requirements */}
                    <div>
                        <Label className={"mb-1 pl-1"}>Requirements (comma separated)</Label>
                        <textarea
                            name="requirements"
                            value={formData.requirements}
                            onChange={handleChange}
                            placeholder="e.g., React, JavaScript, CSS, REST API"
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="3"
                            required
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <Label className={"mb-1 pl-1"}>Location </Label>
                        <Input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g., New York, Remote"
                            required
                        />
                    </div>

                    {/* Salary */}
                    <div>
                        <Label className={"mb-1 pl-1"}>Salary (Annual in LPA)</Label>
                        <Input
                            type="number"
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange}
                            placeholder="e.g., 12"
                            required
                        />
                    </div>

                    {/* Experience */}
                    <div>
                        <Label className={"mb-1 pl-1"}>Years of Experience</Label>
                        <Input
                            type="number"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            placeholder="e.g., 3"
                            required
                        />
                    </div>

                    {/* Job Type */}
                    <div>
                        <Label className={"mb-1 pl-1"}>Job Type </Label>
                        <Select value={formData.jobType} onValueChange={(value) => handleSelectChange('jobType', value)}>
                            <SelectTrigger className="w-full max-w-xs">
                                <SelectValue placeholder="Select job type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Job Type</SelectLabel>
                                    <SelectItem value="Full-time">Full-time</SelectItem>
                                    <SelectItem value="Part-time">Part-time</SelectItem>
                                    <SelectItem value="Contract">Contract</SelectItem>
                                    <SelectItem value="Temporary">Temporary</SelectItem>
                                    <SelectItem value="Internship">Internship</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Position */}
                    <div>
                        <Label className={"mb-1 pl-1"}>Position Level</Label>
                        <Select value={formData.position} onValueChange={(value) => handleSelectChange('position', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select position level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Entry Level">Entry Level</SelectItem>
                                <SelectItem value="Mid Level">Mid Level</SelectItem>
                                <SelectItem value="Senior">Senior</SelectItem>
                                <SelectItem value="Lead">Lead</SelectItem>
                                <SelectItem value="Manager">Manager</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Buttons */}
                    <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6'>
                        <Button
                            type="submit"
                            className="w-full sm:flex-1"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Updating...
                                </>
                            ) : (
                                'Update Job'
                            )}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full sm:flex-1"
                            onClick={() => navigate('/admin/jobs')}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditJob
