import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

const getStatusClass = (status) => {
    if (status === "rejected") return "bg-red-500";
    if (status === "pending") return "bg-gray-500";
    return "bg-green-400";
};

const AppliedJobTables = () => {
    const { appliedJobs = [] } = useSelector((store) => store.job);

    return (
        <div>
            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
                <Table className="text-xs sm:text-sm">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Job Role</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {appliedJobs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                                    You have not applied any jobs.
                                </TableCell>
                            </TableRow>
                        ) : (
                            appliedJobs.map((job) => (
                                <TableRow key={job?._id}>
                                    <TableCell>
                                        {job?.createdAt?.split("T")[0]}
                                    </TableCell>
                                    <TableCell>{job?.job?.title}</TableCell>
                                    <TableCell>{job?.job?.company?.name}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge
                                            className={`text-xs ${getStatusClass(job?.status)}`}
                                        >
                                            {job?.status?.toLowerCase()}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile Card View */}
            <div className="sm:hidden space-y-4">
                {appliedJobs.length === 0 ? (
                    <div className="text-center py-8 text-sm text-gray-500">
                        You have not applied any jobs.
                    </div>
                ) : (
                    appliedJobs.map((job) => (
                        <div
                            key={job?._id}
                            className="bg-gray-50 border border-gray-200 rounded-lg p-3"
                        >
                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-gray-700">Date:</p>
                                        <p className="text-gray-600">
                                            {job?.createdAt?.split("T")[0]}
                                        </p>
                                    </div>

                                    <Badge
                                        className={`text-xs ${getStatusClass(
                                            job?.status
                                        )}`}
                                    >
                                        {job?.status?.toLowerCase()}
                                    </Badge>
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-700">Job Role:</p>
                                    <p className="text-gray-600">{job?.job?.title}</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-700">Company:</p>
                                    <p className="text-gray-600">
                                        {job?.job?.company?.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AppliedJobTables;
