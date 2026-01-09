
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
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
import ForgotPassword from './components/auth/ForgotPassword'
import Otp from './components/auth/Otp'
import NewPassword from './components/auth/NewPassword'
import ProtectedRoute from './components/middleware/ProtectedRoute'
import OtpGuard from "./components/middleware/OtpGuard";
import PublicRoute from './components/middleware/PublicRoute'

function App() {


  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: "/login",
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      )
    },
    {
      path: "/signup",
      element: (
        <PublicRoute>
          <Signup />
        </PublicRoute>
      )
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />
    },
    {
      path: "/otp",
      element: (
        <OtpGuard>
          <Otp />
        </OtpGuard>
      )
    },
    {
      path: '/newPassword',
      element: <NewPassword />
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
      element: (
        <ProtectedRoute role="recruiter">
          <Companies />
        </ProtectedRoute>
      )
    },
    {
      path: "/admin/companies/create",
      element: (
        <ProtectedRoute role="recruiter">
          <CreateCompany />
        </ProtectedRoute>
      )
    },
    {
      path: "/admin/companies/:id",
      element: (
        <ProtectedRoute role="recruiter">
          <CompanySetup />
        </ProtectedRoute>
      )
    },
    {
      path: "/admin/jobs",
      element: (
        <ProtectedRoute role="recruiter">
          <AdminJob />
        </ProtectedRoute>
      )
    },
    {
      path: "/admin/job/create",
      element: (
        <ProtectedRoute role="recruiter">
          <CreateAdminJob />
        </ProtectedRoute>
      )
    },
    {
      path: "/admin/jobs/:id/applicants",
      element: (
        <ProtectedRoute role="recruiter">
          <Applicants />
        </ProtectedRoute>
      )
    },

  ])

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
