import axios from 'axios'
import { useEffect } from 'react'
import { USER_END_POINT_URL } from '../utiles/urls'
import { useDispatch, useSelector } from 'react-redux'
import { setSavedJobs } from '../redux/jobSlice'

const useGetSavedJobs = () => {
    const dispatch = useDispatch()
    const user = useSelector((store) => store.auth.user)

    useEffect(() => {
        if (!user) {
            return
        }

        const fetchSavedJobs = async () => {
            try {
                const res = await axios.get(`${USER_END_POINT_URL}/saved-jobs`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setSavedJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSavedJobs()
    }, [dispatch, user])
}

export default useGetSavedJobs
