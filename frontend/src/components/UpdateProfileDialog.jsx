import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, Camera } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_END_POINT_URL } from "./utiles/urls";
import { toast } from "sonner";
import { setUser } from "./redux/authSlice";

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        bio: user?.profile?.bio || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        skills: user?.profile?.skills?.join(", ") || "",
        profilePhoto: null,
        resume: null,
    });

    // For previewing profile photo before upload
    const [profilePhotoPreview, setProfilePhotoPreview] = useState(user?.profile?.profilePhoto || "");

    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const profilePhotoChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, profilePhoto: file });
            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setProfilePhotoPreview(previewUrl);
        }
    };

    const resumeChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, resume: file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);

        // Append profile photo if selected
        if (input.profilePhoto) {
            formData.append("profilePhoto", input.profilePhoto);
        }

        // Append resume if selected
        if (input.resume) {
            formData.append("resume", input.resume);
        }

        try {
            const res = await axios.post(`${USER_END_POINT_URL}/profile/update`, formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (res.data.success) {
                toast.success(res.data.message);
                if (res.data.user) {
                    dispatch(setUser(res.data.user));
                }
                setOpen(false); // only close on success
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-full max-w-[90vw] sm:max-w-106.25 rounded-lg" onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle className="text-base sm:text-lg">Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className="grid gap-3 sm:gap-4 py-4 max-h-[60vh] overflow-y-auto">
                        {/* Profile Photo Section */}
                        <div className="flex flex-col items-center gap-3 mb-4">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-border">
                                    <img
                                        src={profilePhotoPreview || user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                                        alt="Profile Photo"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <label htmlFor="profilePhoto" className="absolute bottom-0 right-0 bg-red-500 text-white p-1.5 rounded-full cursor-pointer hover:bg-red-600 transition-colors">
                                    <Camera size={16} />
                                    <input
                                        id="profilePhoto"
                                        name="profilePhoto"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={profilePhotoChangeHandler}
                                    />
                                </label>
                            </div>
                            <span className="text-xs text-muted-foreground">Click camera icon to update profile photo</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 items-start sm:items-center">
                            <Label htmlFor="fullname" className="text-xs sm:text-sm">Name</Label>
                            <Input id="fullname" name="fullname" className="col-span-1 sm:col-span-3 text-xs sm:text-sm py-1 sm:py-2" value={input.fullname} onChange={changeEventHandler} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 items-start sm:items-center">
                            <Label htmlFor="bio" className="text-xs sm:text-sm">Bio</Label>
                            <Input id="bio" name="bio" className="col-span-1 sm:col-span-3 text-xs sm:text-sm py-1 sm:py-2" value={input.bio} onChange={changeEventHandler} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 items-start sm:items-center">
                            <Label htmlFor="email" className="text-xs sm:text-sm">Email</Label>
                            <Input id="email" name="email" className="col-span-1 sm:col-span-3 text-xs sm:text-sm py-1 sm:py-2" value={input.email} onChange={changeEventHandler} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 items-start sm:items-center">
                            <Label htmlFor="phoneNumber" className="text-xs sm:text-sm">Contact</Label>
                            <Input id="phoneNumber" name="phoneNumber" className="col-span-1 sm:col-span-3 text-xs sm:text-sm py-1 sm:py-2" value={input.phoneNumber} onChange={changeEventHandler} />
                        </div>
                        {user?.role === "user" && (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 items-start sm:items-center">
                                    <Label htmlFor="skills" className="text-xs sm:text-sm">Skills</Label>
                                    <Input
                                        id="skills"
                                        name="skills"
                                        className="col-span-1 sm:col-span-3 text-xs sm:text-sm py-1 sm:py-2"
                                        value={input.skills}
                                        onChange={changeEventHandler}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 items-start sm:items-center">
                                    <Label htmlFor="resume" className="text-xs sm:text-sm">Resume</Label>
                                    <Input
                                        id="resume"
                                        name="resume"
                                        type="file"
                                        accept="application/pdf"
                                        className="col-span-1 sm:col-span-3 text-xs py-1 sm:py-2"
                                        onChange={resumeChangeHandler}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                    <Button type="submit" className="w-full my-4 text-xs sm:text-sm py-2 sm:py-3" disabled={loading}>
                        {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait</> : "Update"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;
