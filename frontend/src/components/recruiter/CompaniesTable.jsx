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
        <div className='w-full overflow-x-auto'>
            <Table className='w-full'>
                <TableCaption>A list of companies you recently created</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-16'>Logo</TableHead>
                        <TableHead className='hidden sm:table-cell'>Company Name</TableHead>
                        <TableHead className='hidden md:table-cell'>Date</TableHead>
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
                                <TableCell className='hidden sm:table-cell font-medium'>{company.name}</TableCell>
                                <TableCell className='hidden md:table-cell text-sm text-gray-600'>
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
    )
}

export default CompaniesTable