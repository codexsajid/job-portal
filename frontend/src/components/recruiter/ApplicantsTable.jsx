import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import useGetAllApplicants from '../hook/useGetAllApplicants'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { APPLICANT_END_POINT_URL } from '../utiles/urls'
import { useSelector } from 'react-redux'
import { Badge } from '../ui/badge'

const shortListStatus = ["Accepted", "Rejected"]
const ApplicantsTable = () => {
    const param = useParams()
    useGetAllApplicants(param.id)

    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(`${APPLICANT_END_POINT_URL}/status/${id}/update`, { status }, { withCredentials: true })
            if (res.data.success) {
                toast.success(res.data.message)

            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const { applicants } = useSelector((store) => store.application)

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className={"text-right"}>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants.length > 0 ? (
                        applicants.map(applicant => (
                            <TableRow key={applicant._id}>
                                <TableCell>{applicant?.applicant?.fullname}</TableCell>
                                <TableCell>{applicant?.applicant?.email}</TableCell>
                                <TableCell>{applicant?.applicant?.phoneNumber}</TableCell>
                                <TableCell>
                                    {applicant?.applicant?.profile?.resume ? (
                                        <a href={applicant.applicant.profile.resume} target="_blank" rel="noopener noreferrer" className='text-blue-500'>
                                            {applicant.applicant.profile.resumeOriginalName}
                                        </a>
                                    ) : 'NA'}
                                </TableCell>
                                <TableCell>{applicant?.createdAt.split("T")[0]}</TableCell>
                                <TableCell>
                                    <Badge className={`${applicant.status == 'rejected' ? 'bg-red-500' : applicant.status == 'pending' ? 'bg-gray-500' : 'bg-green-400'}`}>{applicant?.status.toLowerCase()}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-35">
                                            {shortListStatus.map((status, index) => (
                                                <div key={index} onClick={() => statusHandler(status, applicant._id)} className="mb-1 cursor-pointer">
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
                            <TableCell colSpan={6} className="text-center">
                                No applicants found.
                            </TableCell>
                        </TableRow>
                    )}

                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable