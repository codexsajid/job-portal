import React, { useState } from 'react'
import { Input } from '../ui/input'
import { ArrowLeft, Loader2, Eye, EyeOff } from 'lucide-react'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_END_POINT_URL } from '../utiles/urls'

const NewPassword = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const email = localStorage.getItem("emailForReset")

  const submitHandler = async (e) => {
    e.preventDefault()

    // Validation
    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters long")
      return
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (!email) {
      toast.error("Email not found. Please start password reset again")
      navigate('/forgot-password')
      return
    }

    try {
      setLoading(true)

      // API call to reset password
      const res = await axios.post(
        `${USER_END_POINT_URL}/reset-password`,
        { email, password },
        { withCredentials: true }
      )

      if (res.data.success) {
        toast.success(res.data.message || "Password reset successfully")
        // Clear stored email
        localStorage.removeItem("emailForReset")
        // Navigate to login
        setTimeout(() => navigate('/login'), 1000)
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Failed to reset password. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!email) {
    return (
      <div className='max-w-150 m-auto mt-30'>
        <div className='border border-gray-200 rounded-sm shadow-sm p-10'>
          <p className='text-center'>Session expired. Please start again.</p>
          <Button
            className="w-full mt-4"
            onClick={() => navigate('/forgot-password')}
          >
            Back to Forgot Password
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='max-w-150 m-auto mt-30'>
      <div className='border border-gray-200 rounded-sm shadow-sm p-10'>
        <form onSubmit={submitHandler} className='p-4'>

          <div className='flex items-center gap-2 my-5'>
            <ArrowLeft
              className='cursor-pointer'
              onClick={() => navigate('/otp')}
            />
            <h1 className='font-bold text-xl'>Reset Password</h1>
          </div>

          <div className='my-2'>
            <Label className={"pb-1"}>New Password</Label>
            <div className='relative'>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
              <button
                type='button'
                className='absolute right-3 top-1/2 transform -translate-y-1/2'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
              </button>
            </div>
          </div>

          <div className='my-2'>
            <Label className={"pb-1"}>Confirm Password</Label>
            <div className='relative'>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                required
              />
              <button
                type='button'
                className='absolute right-3 top-1/2 transform -translate-y-1/2'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full my-4" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Please wait
              </>
            ) : (
              "Reset Password"
            )}
          </Button>

        </form>
      </div>
    </div>
  )
}

export default NewPassword