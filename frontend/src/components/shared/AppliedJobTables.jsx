import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { useSelector, useDispatch } from "react-redux";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { APPLICANT_END_POINT_URL } from "../utiles/urls";
import { setAppliedJobs } from "../redux/jobSlice";

const getStatusClass = (status) => {
    if (status === "rejected") return "bg-red-500";
    if (status === "pending") return "bg-gray-500";
    return "bg-green-400";
};

const AppliedJobTables = () => {
    const dispatch = useDispatch();
    const { appliedJobs = [] } = useSelector((store) => store.job);
    const [deletingId, setDeletingId] = useState(null);

    const handleDelete = async (applicationId) => {
        setDeletingId(applicationId);
        try {
            const res = await axios.delete(
                `${APPLICANT_END_POINT_URL}/${applicationId}`,
                { withCredentials: true }
            );
            if (res.data.success) {
                toast.success(res.data.message);
                // Remove the deleted application from the list
                const updatedJobs = appliedJobs.filter(job => job._id !== applicationId);
                dispatch(setAppliedJobs(updatedJobs));
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to delete application");
        } finally {
            setDeletingId(null);
        }
    };

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
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {appliedJobs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-4 text-gray-500">
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
                                    <TableCell className="text-right">
                                        <button
                                            onClick={() => handleDelete(job._id)}
                                            disabled={deletingId === job._id}
                                            className="p-1 hover:bg-red-100 rounded text-red-500 disabled:opacity-50"
                                            title="Delete application"
                                        >
                                            {deletingId === job._id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <Trash2 className="h-4 w-4" />
                                            )}
                                        </button>
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

                                <div className="flex justify-end pt-2">
                                    <button
                                        onClick={() => handleDelete(job._id)}
                                        disabled={deletingId === job._id}
                                        className="flex items-center gap-1 px-2 py-1 text-red-500 hover:bg-red-100 rounded disabled:opacity-50"
                                    >
                                        {deletingId === job._id ? (
                                            <Loader2 className="h-3 w-3 animate-spin" />
                                        ) : (
                                            <Trash2 className="h-3 w-3" />
                                        )}
                                        <span className="text-xs">Delete</span>
                                    </button>
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
