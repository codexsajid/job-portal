import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { useSelector } from 'react-redux'


const AppliedJobTables = () => {

    const { appliedJobs } = useSelector(store => store.job)

    return (
        <div>
            {/* Desktop Table View */}
            <div className='hidden sm:block overflow-x-auto'>
                <Table className='text-xs sm:text-sm'>
                    <TableCaption className='text-xs sm:text-sm'>A list of your applied jobs</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='text-xs sm:text-sm'>Date</TableHead>
                            <TableHead className='text-xs sm:text-sm'>Job Role</TableHead>
                            <TableHead className='text-xs sm:text-sm'>Company</TableHead>
                            <TableHead className={"text-right text-xs sm:text-sm"}>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            appliedJobs?.length == 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className='text-center text-xs sm:text-sm py-4'>
                                        You have not applied any jobs.
                                    </TableCell>
                                </TableRow>
                            ) : appliedJobs.map((appliedJob) => (
                                <TableRow key={appliedJob?._id}>
                                    <TableCell className='text-xs sm:text-sm'>{appliedJob?.createdAt.split("T")[0]}</TableCell>
                                    <TableCell className='text-xs sm:text-sm'>{appliedJob?.job?.title}</TableCell>
                                    <TableCell className='text-xs sm:text-sm'>{appliedJob?.job?.company?.name}</TableCell>
                                    <TableCell className={"text-right text-xs sm:text-sm"}>
                                        <Badge className={`text-xs sm:text-sm ${appliedJob.status == 'rejected' ? 'bg-red-500' : appliedJob.status == 'pending' ? 'bg-gray-500' : 'bg-green-400'}`}>{appliedJob?.status.toLowerCase()}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>

            {/* Mobile Card View */}
            <div className='sm:hidden space-y-4'>
                {
                    appliedJobs?.length == 0 ? (
                        <div className='text-center py-8 text-sm text-gray-500'>
                            You have not applied any jobs.
                        </div>
                    ) : appliedJobs.map((appliedJob) => (
                        <div key={appliedJob?._id} className='bg-gray-50 border border-gray-200 rounded-lg p-3'>
                            <div className='space-y-2 text-xs'>
                                <div className='flex justify-between items-start'>
                                    <div>
                                        <p className='font-semibold text-gray-700'>Date:</p>
                                        <p className='text-gray-600'>{appliedJob?.createdAt.split("T")[0]}</p>
                                    </div>
                                    <Badge className={`text-xs flex-shrink-0 ${appliedJob.status == 'rejected' ? 'bg-red-500' : appliedJob.status == 'pending' ? 'bg-gray-500' : 'bg-green-400'}`}>
                                        {appliedJob?.status.toLowerCase()}
                                    </Badge>
                                </div>
                                <div>
                                    <p className='font-semibold text-gray-700'>Job Role:</p>
                                    <p className='text-gray-600'>{appliedJob?.job?.title}</p>
                                </div>
                                <div>
                                    <p className='font-semibold text-gray-700'>Company:</p>
                                    <p className='text-gray-600'>{appliedJob?.job?.company?.name}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default AppliedJobTables