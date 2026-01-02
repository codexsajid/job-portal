import axios from 'axios'
import { useEffect } from 'react'
import { JOB_END_POINT_URL } from '../utiles/urls'
import { useDispatch } from 'react-redux'
import { setAllAdminJobs } from '../redux/jobSlice'

const useGetAdminAllJobs = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const getAdminAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_END_POINT_URL}/getAdminJob`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs))
                }

            } catch (error) {
                console.log(error)
            }
        }
        getAdminAllJobs()
    }, [])
}

export default useGetAdminAllJobs