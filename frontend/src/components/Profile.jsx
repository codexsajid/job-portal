import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Contact, Mail, Pen } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import AppliedJobTables from './shared/AppliedJobTables'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import { useGetAppliedJobs } from './hook/useGetAppliedJobs'



const Profile = () => {
    useGetAppliedJobs()
    const [open, setOpen] = useState(false);
    const { user } = useSelector((store) => store.auth);

    return (
        <div>
            <Navbar />
            <div className="w-full bg-gray-50 min-h-screen">
                <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
                    {/* Profile Card */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3 sm:p-4 md:p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <Avatar className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <h1 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl truncate">{user?.fullname}</h1>
                                    <p className="text-xs sm:text-xs md:text-sm text-gray-600 line-clamp-2">{user?.profile?.bio}</p>
                                </div>
                            </div>
                            <Button onClick={() => setOpen(true)} variant="outline" className="cursor-pointer flex items-center gap-1 px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs flex-shrink-0 ml-2">
                                <Pen size={14} className="sm:w-4 sm:h-4" />
                                <span className="hidden sm:inline">Edit</span>
                            </Button>
                        </div>

                        <div className='space-y-2 sm:space-y-3'>
                            <div className="flex items-center gap-2 sm:gap-3">
                                <Mail size={16} className="flex-shrink-0 sm:w-5 sm:h-5" />
                                <span className="text-xs sm:text-sm break-all">{user?.email}</span>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3">
                                <Contact size={16} className="flex-shrink-0 sm:w-5 sm:h-5" />
                                <span className="text-xs sm:text-sm">+91{user?.phoneNumber}</span>
                            </div>
                        </div>

                        <div className="mt-4 sm:mt-6">
                            <h2 className="font-bold text-sm sm:text-base md:text-lg mb-2 sm:mb-3">Skills</h2>
                            <div className="flex flex-wrap gap-1 sm:gap-2 max-h-32 overflow-y-auto">
                                {
                                    user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index} className="text-xs whitespace-nowrap">{item}</Badge>) : <span className="text-xs sm:text-sm text-gray-500">NA</span>
                                }
                            </div>
                        </div>

                        <div className="mt-4 sm:mt-6">
                            <h2 className="font-bold text-sm sm:text-base md:text-lg mb-2">Resume</h2>
                            {user?.profile?.resume ? (
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={user.profile.resume}
                                    className="text-blue-600 text-xs sm:text-sm hover:underline cursor-pointer break-all"
                                >
                                    {user.profile.resumeOriginalName || "Resume"}
                                </a>
                            ) : (
                                <span className="text-xs sm:text-sm text-gray-500">NA</span>
                            )}
                        </div>
                    </div>

                    {/* Applied Jobs Section */}
                    <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-6 mt-4 sm:mt-6 mb-6">
                        <h2 className="font-bold text-base sm:text-lg md:text-xl mb-3 sm:mb-4">Applied Jobs</h2>
                        <AppliedJobTables />
                    </div>
                </div>
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};
export default Profile