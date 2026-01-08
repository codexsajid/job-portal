import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_END_POINT_URL } from '../utiles/urls'
import { Loader2 } from 'lucide-react'
import { useSelector } from 'react-redux'

const Signup = () => {
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: null
    })
    const { user } = useSelector(store => store.auth)
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const fileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);

        if (input.file) {
            formData.append("file", input.file); // must match Multer field name
        }
        try {
            setLoading(true)
            const res = await axios.post(
                `${USER_END_POINT_URL}/register`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                localStorage.setItem("emailForOtp", input.email);
                navigate("/otp");
            }
        } catch (error) {
            console.log(error?.response?.data);
            toast.error(error?.response?.data?.message || "Signup failed");
        }
        finally {
            setLoading(false)
        }
    };
    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [])
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form
                    method='post'
                    onSubmit={submitHandler}
                    className='w-1/2 border border-gray-200 rounded-md p-4 my-10 shadow-sm'
                >
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>

                    <div className='my-2'>
                        <Label className='my-2'>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="sajid"
                        />
                    </div>

                    <div className='my-2'>
                        <Label className='my-2'>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="sajid@gmail.com"
                        />
                    </div>

                    <div className='my-2'>
                        <Label className='my-2'>Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="1234567890"
                        />
                    </div>

                    <div className='my-2'>
                        <Label className='my-2'>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="********"
                        />
                    </div>

                    <div className='flex items-center justify-between'>
                        <RadioGroup className={`flex items-center gap-4 my-4`}>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="user"
                                    checked={input.role === "user"}
                                    onChange={changeEventHandler}
                                    className={`cursor-pointer`}
                                />
                                <Label>User</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === "recruiter"}
                                    onChange={changeEventHandler}
                                    className={`cursor-pointer`}
                                />
                                <Label>Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex items-center gap-3'>
                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                className={`cursor-pointer`}
                                onChange={fileHandler}
                            />
                        </div>
                    </div>

                    {
                        loading ? <Button type="submit" className={`w-full my-4`}><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button> : <Button type="submit" className={`w-full my-4`}>Sign Up</Button>
                    }
                    <span className='text-sm'>
                        Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Signup