import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './shared/HeroSection'
import CategoryCarousel from './shared/CategoryCarousel'
import LatestJobs from './shared/LatestJobs'
import Footer from './shared/Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const navigate = useNavigate()
    const { user } = useSelector((store) => store.auth)

    useEffect(() => {
        if (user?.role == "recruiter") {
            navigate("/admin/companies")
        }

    }, [])
    return (
        <div className="w-full overflow-x-hidden">
            <Navbar />
            <HeroSection />
            <CategoryCarousel />
            <LatestJobs />
            <Footer />
        </div>
    )
}

export default Home