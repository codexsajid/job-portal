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
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CompaniesTable = () => {
    const navigate = useNavigate()
    const { allCompany } = useSelector(store => store.company)

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
                                    <p className='text-gray-500'>Company Not Found</p>
                                    <p className='text-sm text-gray-400'>You have not registered any company yet.</p>
                                </TableCell>
                            </TableRow>
                        ) : (
                            allCompany?.map(company => (
                                <TableRow key={company._id} className='hover:bg-gray-50'>
                                    <TableCell>
                                        <Avatar className='h-10 w-10'>
                                            <AvatarImage
                                                src={company.logo || 'https://via.placeholder.com/50'}
                                                alt={company.name}
                                            />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className='font-medium'>{company.name}</TableCell>
                                    <TableCell className='text-sm text-gray-600'>
                                        {company.createdAt.split('T')[0]}
                                    </TableCell>
                                    <TableCell className="text-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger className='hover:bg-gray-100 p-2 rounded-md transition'>
                                                <MoreHorizontal size={18} />
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-32 p-2"
                                                onClick={() =>
                                                    navigate(`/admin/companies/${company._id}`)
                                                }
                                            >
                                                <div className='flex gap-2 items-center hover:bg-gray-100 p-2 rounded cursor-pointer'>
                                                    <Edit2 size={18} />
                                                    <span className='text-sm'>Edit</span>
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
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className='text-gray-500 font-medium'>Company Not Found</p>
                        <p className='text-sm text-gray-400 mt-2'>You have not registered any company yet.</p>
                    </div>
                ) : (
                    <div className='space-y-3'>
                        {allCompany?.map(company => (
                            <div key={company._id} className='bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition'>
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
                                            <p className='text-xs text-gray-500 mt-1'>
                                                {company.createdAt.split('T')[0]}
                                            </p>
                                        </div>
                                    </div>
                                    <Popover>
                                        <PopoverTrigger className='hover:bg-gray-100 p-2 rounded-md transition flex-shrink-0'>
                                            <MoreHorizontal size={18} />
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-32 p-2"
                                            onClick={() =>
                                                navigate(`/admin/companies/${company._id}`)
                                            }
                                        >
                                            <div className='flex gap-2 items-center hover:bg-gray-100 p-2 rounded cursor-pointer'>
                                                <Edit2 size={18} />
                                                <span className='text-sm'>Edit</span>
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