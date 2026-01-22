import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Navbar from '../shared/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_END_POINT_URL } from '../utiles/urls'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '../hook/useGetCompanyById'


const CompanySetup = () => {
    const params = useParams()
    useGetCompanyById(params.id)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState({
        name: "",
        description: "",
        location: "",
        website: "",
        file: null
    })
    const { singleCompany } = useSelector(store => store.company)

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const changeFileHandler = (e) => {
        const file = e.target.files[0]
        setInput({ ...input, file })
    }
    const submitHandler = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("name", input.name)
        formData.append("description", input.description)
        formData.append("location", input.location)
        formData.append("website", input.website)
        if (input.file) {
            formData.append("file", input.file)
        }
        try {
            setLoading(true)
            const res = await axios.put(`${COMPANY_END_POINT_URL}/updateCompany/${params.id}`, formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                }
            );

            if (res.data.success) {
                toast.success(res?.data?.message)
                navigate('/admin/companies')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message || "Something went wrong")
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            location: singleCompany.location || "",
            website: singleCompany.website || "",
            file: singleCompany.file || ""
        })
    }, [singleCompany])

    return (
        <div>
            <Navbar />
            <div className="max-w-2xl mx-auto my-4 sm:my-6 p-3 sm:p-4 md:p-6 border rounded-lg shadow-sm bg-white">
                <form onSubmit={submitHandler}>
                    <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
                        <Button
                            className="flex items-center text-gray-600 cursor-pointer w-fit"
                            variant="outline"
                            type="button"
                            onClick={() => navigate("/admin/companies")}
                        >
                            <ArrowLeft className="mt-0.5" />
                            <span>Back</span>
                        </Button>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Company Setup</h1>
                    </div>


                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Company Name</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                placeholder="Enter company name"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                placeholder="Enter company description"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                placeholder="Enter company location"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="website">Website</Label>
                            <Input
                                id="website"
                                type="url"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                placeholder="https://example.com"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="file">Upload Logo</Label>
                            <Input
                                type="file"
                                name="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>


                    <div className="mt-8">
                        {
                            loading ? <Button type="submit" className={`w-full`}><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button> : <Button type="submit" className={`w-full`}>Update</Button>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CompanySetup