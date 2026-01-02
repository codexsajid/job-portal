
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/recruiter/Companies'
import CreateCompany from './components/recruiter/CreateCompany'
import CompanySetup from './components/recruiter/CompanySetup'
import AdminJob from './components/recruiter/AdminJobs'
import CreateAdminJob from './components/recruiter/CreateAdminJob'
import Applicants from './components/recruiter/Applicants'
import ProtectedRoute from './components/hook/ProtectedRoute'


function App() {

  
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/jobs',
      element: <Jobs />
    },
    {
      path: '/job/description/:id',
      element: <JobDescription />
    },
    {
      path: '/browse',
      element: <Browse />
    },
    {
      path: '/profile',
      element: <Profile />
    },

    //Recruiter
    {
      path: '/admin/companies',
      element: <ProtectedRoute><Companies /></ProtectedRoute>
    },
    {
      path: "/admin/companies/create",
      element: <ProtectedRoute> <CreateCompany /></ProtectedRoute>
    },
    {
      path: "/admin/companies/:id",
      element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
    },
    {
      path: "/admin/jobs",
      element: <ProtectedRoute><AdminJob /></ProtectedRoute>
    },
    {
      path: "/admin/job/create",
      element: <CreateAdminJob />
    },
    {
      path: "/admin/jobs/:id/applicants",
      element: <ProtectedRoute><Applicants /></ProtectedRoute>
    },


  ])

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
