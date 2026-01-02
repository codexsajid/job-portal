import axios from 'axios'
import { useEffect } from 'react'
import { COMPANY_END_POINT_URL } from '../utiles/urls'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '../redux/companySlice'

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch()
    useEffect(() => {
        const getCompanyById = async () => {
            try {
                const getCompany = await axios.get(`${COMPANY_END_POINT_URL}/getCompanyById/${companyId}`, { withCredentials: true })
                if (getCompany.data.success) {
                    dispatch(setSingleCompany(getCompany.data.data))
                }

            } catch (error) {
                console.log(error)
            }
        }
        getCompanyById()
    }, [companyId, dispatch])
}

export default useGetCompanyById