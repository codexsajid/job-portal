import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_END_POINT_URL } from '../utiles/urls'

const Otp = () => {
    const navigate = useNavigate()
    const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState(false)

    const email = localStorage.getItem("emailForOtp")   // 👈 saved in signup

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!otp || otp.length !== 4) {
            toast.error("Please enter 4 digit OTP")
            return
        }

        try {
            setLoading(true)

            const res = await axios.post(
                `${USER_END_POINT_URL}/verify-otp`,
                { email, otp },
                { withCredentials: true }
            )

            if (res.data.success) {
                toast.success(res.data.message)
                localStorage.removeItem("emailForOtp")
                navigate("/login")
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "Invalid OTP")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
            <div className="w-full max-w-sm border border-gray-200 rounded-xl p-8 shadow-md bg-white">
                <h1 className="font-bold text-2xl text-center mb-6">Verify OTP</h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="text-center">
                        <Label className="block text-gray-700 mb-2">Enter One-Time Password</Label>
                        <Input
                            className="w-full text-center tracking-widest text-xl py-3 border-gray-500"
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
                        <Button disabled className="w-full py-3">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full py-3 font-medium">
                            Verify OTP
                        </Button>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Otp
