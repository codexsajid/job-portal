import axios from 'axios'
import { useEffect } from 'react'
import { APPLICANT_END_POINT_URL } from '../utiles/urls'
import { useDispatch } from 'react-redux'
import { setAppliedJobs } from '../redux/jobSlice'

export const useGetAppliedJobs = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICANT_END_POINT_URL}/get`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setAppliedJobs(res?.data?.application))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAppliedJobs()
    }, [])
}
