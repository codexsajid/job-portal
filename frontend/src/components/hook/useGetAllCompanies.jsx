import axios from 'axios'
import { useEffect } from 'react'
import { COMPANY_END_POINT_URL } from '../utiles/urls'
import { useDispatch } from 'react-redux'
import { setAllCompany } from '../redux/companySlice'

const useGetAllCompanies = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAllCompanies = async () => {
            try {
                const getCompany = await axios.get(`${COMPANY_END_POINT_URL}/getAllCompanies`, { withCredentials: true })
                if (getCompany.data.success) {
                    dispatch(setAllCompany(getCompany.data.data))
                }

            } catch (error) {
                console.log(error)
            }
        }
        fetchAllCompanies()
    }, [])
}

export default useGetAllCompanies