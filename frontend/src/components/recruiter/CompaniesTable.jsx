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
        <div>
            <Table>
                <TableCaption>A list of companies you recently created</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className={"text-right"}>Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {allCompany?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                Company Not Found Beacuse You Have Not Register New Company.
                            </TableCell>
                        </TableRow>
                    ) : (
                        allCompany?.map(company => (
                            <TableRow key={company._id}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage
                                            src={company.logo || 'https://via.placeholder.com/50'}
                                            alt={company.name}
                                        />
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company.name}</TableCell>
                                <TableCell>
                                    {company.createdAt.split('T')[0]}
                                </TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-32 flex gap-2 items-center"
                                            onClick={() =>
                                                navigate(`/admin/companies/${company._id}`)
                                            }
                                        >
                                            <Edit2 size={18} />
                                            <span>Edit</span>
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