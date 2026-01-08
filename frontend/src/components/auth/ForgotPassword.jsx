import React from 'react'
import { Input } from '../ui/input'
import { ArrowLeft } from 'lucide-react'
import { Label } from '../ui/label'
import { useSelector } from 'react-redux'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const navigate = useNavigate()
    const { loading } = useSelector(store => store.auth);
    return (
        <div className='max-w-150 m-auto mt-30'>
            <div className='border border-gray-200 rounded-sm shadow-sm p-10'>
                <form onSubmit={() => navigate('/otp')} className='p-4'>
                    <div className='flex items-center gap-2 my-5'>
                        <ArrowLeft onClick={() => navigate('/login')} />
                        <h1 className='font-bold text-xl'>Forgot Password</h1>
                    </div>
                    <div className='my-2'>
                        <Label className='my-2'>Email</Label>
                        <Input
                            type="email"
                            // value={input.email}
                            name="email"
                            // onChange={changeEventHandler}
                            placeholder="sajid1234@gmail.com"
                        />

                    </div>

                    {
                        loading ? <Button type="submit" className={`w-full my-4`}><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button> : <Button type="submit" className={`w-full my-4`}>Send OTP</Button>
                    }
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword