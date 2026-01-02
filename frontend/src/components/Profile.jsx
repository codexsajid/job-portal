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
            <div className="max-w-4xl m-auto bg-white border border-gray-600 rounded-2xl my-5 p-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="w-20 h-20">
                            <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className="font-bold text-2xl">{user?.fullname}</h1>
                            <p className="text-sm">{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} variant="outline" className="cursor-pointer">
                        <Pen />
                    </Button>
                </div>

                <div>
                    <div className="flex items-center gap-3 my-3">
                        <Mail size={18} />
                        <span className="text-sm">{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3 my-3">
                        <Contact size={18} />
                        <span className="text-sm">+91{user?.phoneNumber}</span>
                    </div>
                </div>

                <div>
                    <h1 className="font-bold">Skills</h1>
                    <div className="flex gap-3 my-2">
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>

                <div>
                    <h1 className="font-bold">Resume</h1>
                    {user?.profile?.resume ? (
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={user.profile.resume}
                            className="text-blue-500 w-full hover:underline cursor-pointer"
                        >
                            {user.profile.resumeOriginalName || "Resume"}
                        </a>
                    ) : (
                        <span>NA</span>
                    )}
                </div>
            </div>

            <div className="max-w-4xl m-auto bg-white rounded-2xl my-5">
                <h1 className="font-bold text-lg my-3">Applied Jobs</h1>
                <AppliedJobTables />
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};
export default Profile