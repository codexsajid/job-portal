import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_END_POINT_URL } from '../utiles/urls'

const Otp = () => {
    const navigate = useNavigate()
    const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState(false)

    // Check if this is for signup or password reset
    const emailForSignup = localStorage.getItem("emailForOtp")
    const emailForReset = localStorage.getItem("emailForReset")
    const email = emailForSignup || emailForReset
    const isPasswordReset = !!emailForReset

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!otp || otp.length !== 4) {
            toast.error("Please enter 4 digit OTP")
            return
        }

        if (!email) {
            toast.error("Email not found. Please start again.")
            navigate(isPasswordReset ? '/forgot-password' : '/signup')
            return
        }

        try {
            setLoading(true)

            // Use appropriate endpoint based on flow
            const endpoint = isPasswordReset ? '/verify-reset-otp' : '/verify-otp'

            const res = await axios.post(
                `${USER_END_POINT_URL}${endpoint}`,
                { email, otp },
                { withCredentials: true }
            )

            if (res.data.success) {
                toast.success(res.data.message || "OTP verified successfully")

                if (isPasswordReset) {
                    // Password reset flow
                    navigate("/newPassword")
                } else {
                    // Signup flow
                    localStorage.removeItem("emailForOtp")
                    navigate("/login")
                }
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "Invalid OTP")
        } finally {
            setLoading(false)
        }
    }

    const handleGoBack = () => {
        if (isPasswordReset) {
            navigate('/forgot-password')
        } else {
            navigate('/signup')
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4 sm:px-6">
            <div className="w-full max-w-sm border border-gray-200 rounded-xl p-6 sm:p-8 shadow-md bg-white">
                <div className='flex items-center gap-2 mb-6'>
                    <ArrowLeft
                        size={20}
                        className='cursor-pointer'
                        onClick={handleGoBack}
                    />
                    <h1 className="font-bold text-lg sm:text-xl md:text-2xl">Verify OTP</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="text-center">
                        <Label className="block text-gray-700 mb-2 text-xs sm:text-sm">Enter One-Time Password</Label>
                        <p className='text-xs sm:text-sm text-gray-500 mb-3'>Sent to {email}</p>
                        <Input
                            className="w-full text-center tracking-widest text-lg sm:text-xl py-3 border-gray-500 text-xs sm:text-base"
                            type="text"
                            name="otp"
                            maxLength={4}
                            autoFocus
                            placeholder="1234"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                        />
                    </div>

                    {loading ? (
                        <Button disabled className="w-full py-3 text-xs sm:text-sm">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full py-3 font-medium text-xs sm:text-sm">
                            Verify OTP
                        </Button>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Otp
