import React, { useState } from 'react'
import { Input } from '../ui/input'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_END_POINT_URL } from '../utiles/urls'

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault()

        // Email validation
        if (!email || !email.includes('@')) {
            toast.error("Please enter a valid email address")
            return
        }

        try {
            setLoading(true)

            // API call to send OTP
            const res = await axios.post(
                `${USER_END_POINT_URL}/send-otp`,
                { email },
                { withCredentials: true }
            )

            if (res.data.success) {
                toast.success(res.data.message || "OTP sent successfully")
                // Store email in localStorage for verification
                localStorage.setItem("emailForReset", email)
                // Navigate to OTP verification page
                navigate('/otp')
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "Failed to send OTP. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='max-w-md sm:max-w-lg m-auto mt-12 sm:mt-24 px-4'>
            <div className='border border-gray-200 rounded-sm shadow-sm p-6 sm:p-10'>
                <form onSubmit={submitHandler} className='p-0 sm:p-4'>

                    <div className='flex items-center gap-2 my-5'>
                        <ArrowLeft
                            size={20}
                            className='cursor-pointer'
                            onClick={() => navigate('/login')}
                        />
                        <h1 className='font-bold text-lg sm:text-xl md:text-2xl'>Forgot Password</h1>
                    </div>

                    <div className='my-4'>
                        <Label className={"pb-1 text-xs sm:text-sm"}>Email</Label>
                        <Input
                            type="email"
                            value={email}
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="sajid1234@gmail.com"
                            className='text-xs sm:text-sm'
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full my-4" disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait
                            </>
                        ) : (
                            "Send OTP"
                        )}
                    </Button>

                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
