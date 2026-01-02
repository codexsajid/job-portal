import axios from 'axios'
import { useEffect } from 'react'
import { JOB_END_POINT_URL } from '../utiles/urls'
import { useDispatch } from 'react-redux'
import { setAllJobs } from '../redux/jobSlice'

const useGetAllJobs = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const getAllJobs = async () => {
            try {
                const getJobs = await axios.get(`${JOB_END_POINT_URL}/getAllJobs`, { withCredentials: true })
                if (getJobs.data.success) {
                    dispatch(setAllJobs(getJobs.data.jobs))
                }

            } catch (error) {
                console.log(error)
            }
        }
        getAllJobs()
    }, [])
}

export default useGetAllJobs