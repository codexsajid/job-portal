import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const AdminJobsTable = () => {
    const { allAdminJobs } = useSelector(store => store.job)
    const navigate = useNavigate()

    return (
        <>
            {/* Desktop View */}
            <div className='hidden md:block overflow-x-auto'>
                <Table className='text-xs sm:text-sm'>
                    <TableCaption className='text-xs sm:text-sm'>A list of Jobs you recently created</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='text-xs sm:text-sm'>Company Name</TableHead>
                            <TableHead className='text-xs sm:text-sm'>Role</TableHead>
                            <TableHead className='text-xs sm:text-sm'>Date</TableHead>
                            <TableHead className={"text-right text-xs sm:text-sm"}>Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {allAdminJobs?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-xs sm:text-sm">
                                    Job Not Found Because You Have Not Created New Job.
                                </TableCell>
                            </TableRow>
                        ) : (
                            allAdminJobs?.map(job => (
                                <TableRow key={job._id}>
                                    <TableCell className='text-xs sm:text-sm'>{job?.company?.name}</TableCell>
                                    <TableCell className='text-xs sm:text-sm'>{job?.title}</TableCell>
                                    <TableCell className='text-xs sm:text-sm'>
                                        {job.createdAt.split('T')[0]}
                                    </TableCell>
                                    <TableCell className="text-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal />
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-35 p-3"
                                            >
                                                <div
                                                    onClick={() => navigate(`/admin/job/edit/${job._id}`)}
                                                    className='flex items-center gap-2 cursor-pointer'>
                                                    <Edit2 size={18} />
                                                    <span>Edit</span>
                                                </div>
                                                <div onClick={() =>
                                                    navigate(`/admin/jobs/${job._id}/applicants`)
                                                } className='flex items-center gap-2 mt-1 cursor-pointer'>
                                                    <Eye size={18} />
                                                    <span>Applicants</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile View */}
            <div className='md:hidden'>
                {allAdminJobs?.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className='text-gray-500 font-medium text-sm'>Job Not Found</p>
                        <p className='text-xs text-gray-400 mt-2'>You have not created any job yet.</p>
                    </div>
                ) : (
                    <div className='space-y-3'>
                        {allAdminJobs?.map(job => (
                            <div key={job._id} className='bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition'>
                                <div className='flex items-start justify-between gap-3'>
                                    <div className='min-w-0 flex-1'>
                                        <h3 className='font-semibold text-sm truncate'>{job?.title}</h3>
                                        <p className='text-xs text-gray-600 mt-1'>{job?.company?.name}</p>
                                        <p className='text-xs text-gray-500 mt-2'>
                                            {job.createdAt.split('T')[0]}
                                        </p>
                                    </div>
                                    <Popover>
                                        <PopoverTrigger className='hover:bg-gray-100 p-2 rounded-md transition flex-shrink-0'>
                                            <MoreHorizontal size={18} />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-40 p-3">
                                            <div
                                                onClick={() => navigate(`/admin/job/edit/${job._id}`)}
                                                className='flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded'>
                                                <Edit2 size={18} />
                                                <span className='text-sm'>Edit</span>
                                            </div>
                                            <div onClick={() =>
                                                navigate(`/admin/jobs/${job._id}/applicants`)
                                            } className='flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded mt-1'>
                                                <Eye size={18} />
                                                <span className='text-sm'>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default AdminJobsTable