import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
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
        file: null,
    });

    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };
    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
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
            <DialogContent className="w-full max-w-[90vw] sm:max-w-[425px] rounded-lg" onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle className="text-base sm:text-lg">Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className="grid gap-3 sm:gap-4 py-4 max-h-[60vh] overflow-y-auto">
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
                                onChange={fileChangeHandler}
                            />
                        </div>
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