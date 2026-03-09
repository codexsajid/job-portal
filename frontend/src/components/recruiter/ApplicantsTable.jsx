import React, { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal, Loader2 } from 'lucide-react'
import useGetAllApplicants from '../hook/useGetAllApplicants'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { APPLICANT_END_POINT_URL } from '../utiles/urls'
import { useSelector, useDispatch } from 'react-redux'
import { setApplicants } from '../redux/applicationSlice'
import { Badge } from '../ui/badge'

const shortListStatus = ["Accepted", "Rejected", "Pending"]

const ApplicantsTable = () => {
    const param = useParams()
    const dispatch = useDispatch()
    const [loadingApplicantId, setLoadingApplicantId] = useState(null)
    useGetAllApplicants(param.id)

    const { applicants } = useSelector((store) => store.application)

    const statusHandler = async (status, id) => {
        setLoadingApplicantId(id)
        try {
            const res = await axios.post(
                `${APPLICANT_END_POINT_URL}/status/${id}/update`,
                { status },
                { withCredentials: true }
            )
            if (res.data.success) {
                toast.success(res.data.message)
                // Update the specific applicant's status in Redux store
                const updatedApplicants = applicants.map((applicant) =>
                    applicant._id === id ? { ...applicant, status } : applicant
                )
                dispatch(setApplicants(updatedApplicants))
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong")
        } finally {
            setLoadingApplicantId(null)
        }
    }

    return (
        <div className="w-full">
            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden md:block overflow-x-auto">
                <Table className="text-sm">
                    <TableCaption>All Job Applicants</TableCaption>

                    <TableHeader>
                        <TableRow>
                            <TableHead>Full Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Resume</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {applicants?.length > 0 ? (
                            applicants.map((applicant) => (
                                <TableRow key={applicant._id}>
                                    <TableCell>{applicant?.applicant?.fullname}</TableCell>

                                    <TableCell>{applicant?.applicant?.email}</TableCell>

                                    <TableCell>{applicant?.applicant?.phoneNumber}</TableCell>

                                    <TableCell>
                                        {applicant?.applicant?.profile?.resume ? (
                                            <a
                                                href={applicant.applicant.profile.resume}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 underline"
                                            >
                                                {applicant.applicant.profile.resumeOriginalName}
                                            </a>
                                        ) : (
                                            "NA"
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        {applicant?.createdAt?.split("T")[0]}
                                    </TableCell>

                                    <TableCell>
                                        <Badge
                                            className={`${applicant.status?.toLowerCase() === "rejected"
                                                ? "bg-destructive text-white"
                                                : applicant.status?.toLowerCase() === "pending"
                                                    ? "bg-gray-500 text-white dark:bg-gray-600"
                                                    : "bg-green-500 text-white"
                                                }`}
                                        >
                                            {applicant?.status}
                                        </Badge>
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <Popover>
                                            <PopoverTrigger className="cursor-pointer" disabled={loadingApplicantId === applicant._id}>
                                                {loadingApplicantId === applicant._id ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <MoreHorizontal />
                                                )}
                                            </PopoverTrigger>

                                            <PopoverContent className="w-36">
                                                {shortListStatus.map((status, i) => (
                                                    <div
                                                        key={i}
                                                        onClick={() => statusHandler(status, applicant._id)}
                                                        className="cursor-pointer p-2 hover:bg-muted/20 rounded"
                                                    >
                                                        {status}
                                                    </div>
                                                ))}
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-6">
                                    No applicants found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* ================= MOBILE VIEW ================= */}
            <div className="md:hidden space-y-3 mt-4">
                {applicants?.length === 0 ? (
                    <div className="text-center py-10 bg-card rounded">
                        <p className="text-muted-foreground text-sm">No Applicants Found</p>
                    </div>
                ) : (
                    applicants.map((applicant) => (
                        <div key={applicant._id} className="bg-card border border-border rounded-lg p-4 shadow-sm">

                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-sm">
                                        {applicant?.applicant?.fullname}
                                    </h3>
                                    <p className="text-xs text-muted-foreground">
                                        {applicant?.applicant?.email}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {applicant?.createdAt?.split("T")[0]}
                                    </p>
                                </div>

                                <Popover>
                                    <PopoverTrigger className="cursor-pointer" disabled={loadingApplicantId === applicant._id}>
                                        {loadingApplicantId === applicant._id ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <MoreHorizontal size={18} />
                                        )}
                                    </PopoverTrigger>
                                    <PopoverContent className="w-36">
                                        {shortListStatus.map((status, i) => (
                                            <div
                                                key={i}
                                                onClick={() => statusHandler(status, applicant._id)}
                                                className="cursor-pointer p-2 hover:bg-muted/20 rounded"
                                            >
                                                {status}
                                            </div>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div className='flex items-center justify-between'>
                                {/* Resume */}
                                {applicant?.applicant?.profile?.resume && (
                                    <a
                                        href={applicant.applicant.profile.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block text-xs text-blue-500 mt-2 underline"
                                    >
                                        View Resume
                                    </a>
                                )}

                                {/* Status */}
                                <div className="mt-2">
                                    <Badge
                                        className={`${applicant.status?.toLowerCase() === "rejected"
                                            ? "bg-destructive text-white"
                                            : applicant.status?.toLowerCase() === "pending"
                                                ? "bg-gray-500 text-white dark:bg-gray-600"
                                                : "bg-green-500 text-white"
                                            }`}
                                    >
                                        {applicant?.status}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default ApplicantsTable
