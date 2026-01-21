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
        <div className='overflow-x-auto'>
            <Table className='text-xs sm:text-sm'>
                <TableCaption className='text-xs sm:text-sm'>A list of Jobs you recently created</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className='text-xs sm:text-sm'>Company Name</TableHead>
                        <TableHead className='text-xs sm:text-sm hidden sm:table-cell'>Role</TableHead>
                        <TableHead className='text-xs sm:text-sm hidden md:table-cell'>Date</TableHead>
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
                                <TableCell className='text-xs sm:text-sm hidden sm:table-cell'>{job?.title}</TableCell>
                                <TableCell className='text-xs sm:text-sm hidden md:table-cell'>
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
    )
}

export default AdminJobsTable