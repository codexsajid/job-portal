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
        <Dialog open={open}>
            <DialogContent className="/sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="fullname" className="text-right">Name</Label>
                            <Input id="fullname" name="fullname" className="col-span-3" value={input.fullname} onChange={changeEventHandler} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="bio" className="text-right">Bio</Label>
                            <Input id="bio" name="bio" className="col-span-3" value={input.bio} onChange={changeEventHandler} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input id="email" name="email" className="col-span-3" value={input.email} onChange={changeEventHandler} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phoneNumber" className="text-right">Contact</Label>
                            <Input id="phoneNumber" name="phoneNumber" className="col-span-3" value={input.phoneNumber} onChange={changeEventHandler} />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="skills" className="text-right">Skills</Label>
                            <Input
                                id="skills"
                                name="skills"
                                value={input.skills}
                                onChange={changeEventHandler}
                                className="col-span-3"
                            />
                        </div>


                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="resume" className="text-right">Resume</Label>
                            <Input
                                id="resume"
                                name="resume"
                                type="file"
                                accept="application/pdf"
                                className="col-span-3"
                                onChange={fileChangeHandler}
                            />
                        </div>
                        {/* <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="profilePhoto" className="text-right">ProfilePhoto</Label>
                            <Input
                                id="profilePhoto"
                                name="profilePhoto"
                                type="file"
                                accept="image/*"
                                className="col-span-3"
                                onChange={(e) => setInput({ ...input, profilePhoto: e.target.files?.[0] })}
                            />
                        </div> */}

                    </div>
                    <Button type="submit" className="w-full my-4" disabled={loading}>
                        {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait</> : "Update"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;