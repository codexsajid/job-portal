import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_END_POINT_URL } from '../utiles/urls'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: ""
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { loading, user } = useSelector(store => store.auth);
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const res = await axios.post(`${USER_END_POINT_URL}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        }, withCredentials: true
      })
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user))
        navigate("/");
      }
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Login failed");
    }
    finally {
      dispatch(setLoading(false));
    }
  }
  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [])
  return (
    <div>
      <div className='flex items-center justify-center max-w-7xl mx-auto px-4 sm:px-6'>
        <form onSubmit={submitHandler} className='w-full sm:w-1/2 border border-gray-200 rounded-md p-4 sm:p-6 my-10 shadow-sm'>
          <h1 className='font-bold text-lg sm:text-xl md:text-2xl mb-5'>Login</h1>
          <div className='my-2'>
            <Label className='my-2 text-xs sm:text-sm'>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="sajid@gmail.com"
              className='text-xs sm:text-sm'
            />
            <div className='my-2'>
              <Label className='my-2 text-xs sm:text-sm'>Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="********"
                className='text-xs sm:text-sm'
              />
            </div>
          </div>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div className='flex items-center justify-between'>
              <RadioGroup className={`flex items-center gap-2 sm:gap-4 my-4 text-xs sm:text-sm`}>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="user"
                    checked={input.role == "user"}
                    onChange={changeEventHandler}
                    className={`cursor-pointer`}
                  />
                  <Label className='text-xs sm:text-sm'>User</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role == "recruiter"}
                    onChange={changeEventHandler}
                    className={`cursor-pointer`}
                  />
                  <Label className='text-xs sm:text-sm'>Recruiter</Label>
                </div>
              </RadioGroup>
            </div>
            <div className='cursor-pointer'>
              <p className='text-blue-500 text-xs sm:text-sm hover:underline' onClick={() => navigate('/forgot-password')}>forgot password?</p>
            </div>
          </div>
          {
            loading ? <Button type="submit" className={`w-full my-4`}><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button> : <Button type="submit" className={`w-full my-4`}>Login</Button>
          }
          <span className='text-xs sm:text-sm'>Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Signup</Link></span>
        </form>

      </div>
    </div>
  )
}

export default Login