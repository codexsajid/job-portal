import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { COMPANY_END_POINT_URL } from '../utiles/urls'
import { setAllCompany } from '../redux/companySlice'
import { toast } from 'sonner'

const CompaniesTable = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { allCompany } = useSelector(store => store.company)

    const handleDelete = async (companyId) => {
        if (window.confirm('Are you sure you want to delete this company?')) {
            try {
                const res = await axios.delete(`${COMPANY_END_POINT_URL}/deleteCompany/${companyId}`, { withCredentials: true })
                if (res.data.success) {
                    toast.success(res.data.message)
                    // Refetch companies
                    const getCompany = await axios.get(`${COMPANY_END_POINT_URL}/getAllCompanies`, { withCredentials: true })
                    if (getCompany.data.success) {
                        dispatch(setAllCompany(getCompany.data.data))
                    }
                }
            } catch (error) {
                toast.error(error.response?.data?.message || 'Error deleting company')
            }
        }
    }

    return (
        <>
            {/* Desktop View */}
            <div className='hidden md:block w-full overflow-x-auto'>
                <Table className='w-full'>
                    <TableCaption>A list of companies you recently created</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='w-16'>Logo</TableHead>
                            <TableHead>Company Name</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {allCompany?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8">
                                    <p className='text-muted-foreground'>Company Not Found</p>
                                    <p className='text-sm text-muted-foreground/80'>You have not registered any company yet.</p>
                                </TableCell>
                            </TableRow>
                        ) : (
                            allCompany?.map(company => (
                                <TableRow key={company._id} className='hover:bg-muted/50 transition-colors cursor-default'>
                                    <TableCell>
                                        <Avatar className='h-10 w-10'>
                                            <AvatarImage
                                                src={company.logo || 'https://via.placeholder.com/50'}
                                                alt={company.name}
                                            />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className='font-medium'>{company.name}</TableCell>
                                    <TableCell className='text-sm text-muted-foreground'>
                                        {company.createdAt.split('T')[0]}
                                    </TableCell>
                                    <TableCell className="text-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger className='hover:bg-muted/20 p-2 rounded-md transition'>
                                                <MoreHorizontal size={18} />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-32 p-2">
                                                <div className='flex gap-2 items-center hover:bg-muted/20 p-2 rounded cursor-pointer' onClick={() => navigate(`/admin/companies/${company._id}`)}>
                                                    <Edit2 size={18} />
                                                    <span className='text-sm'>Edit</span>
                                                </div>
                                                <div className='flex gap-2 items-center hover:bg-red-50 p-2 rounded cursor-pointer text-red-600' onClick={() => handleDelete(company._id)}>
                                                    <Trash2 size={18} />
                                                    <span className='text-sm'>Delete</span>
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
                {allCompany?.length === 0 ? (
                    <div className="text-center py-12 bg-card rounded-lg">
                        <p className='text-muted-foreground font-medium'>Company Not Found</p>
                        <p className='text-sm text-muted-foreground/80 mt-2'>You have not registered any company yet.</p>
                    </div>
                ) : (
                    <div className='space-y-4'>
                        {allCompany?.map(company => (
                            <div key={company._id} className='bg-card border border-border/50 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300'>
                                <div className='flex items-start justify-between gap-3'>
                                    <div className='flex items-center gap-3 flex-1 min-w-0'>
                                        <Avatar className='h-12 w-12 flex-shrink-0'>
                                            <AvatarImage
                                                src={company.logo || 'https://via.placeholder.com/50'}
                                                alt={company.name}
                                            />
                                        </Avatar>
                                        <div className='min-w-0 flex-1'>
                                            <h3 className='font-semibold text-sm sm:text-base truncate'>{company.name}</h3>
                                            <p className='text-xs text-muted-foreground mt-1'>
                                                {company.createdAt.split('T')[0]}
                                            </p>
                                        </div>
                                    </div>
                                    <Popover>
                                        <PopoverTrigger className='hover:bg-muted/20 p-2 rounded-md transition flex-shrink-0'>
                                            <MoreHorizontal size={18} />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 p-2">
                                            <div className='flex gap-2 items-center hover:bg-muted/20 p-2 rounded cursor-pointer' onClick={() => navigate(`/admin/companies/${company._id}`)}>
                                                <Edit2 size={18} />
                                                <span className='text-sm'>Edit</span>
                                            </div>
                                            <div className='flex gap-2 items-center hover:bg-red-50 p-2 rounded cursor-pointer text-red-600' onClick={() => handleDelete(company._id)}>
                                                <Trash2 size={18} />
                                                <span className='text-sm'>Delete</span>
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

export default CompaniesTable