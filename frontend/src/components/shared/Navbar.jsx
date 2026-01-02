import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import { toast } from "sonner";
import { USER_END_POINT_URL } from "../utiles/urls";
import axios from "axios";

const Navbar = () => {
    const user = useSelector((store) => store.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_END_POINT_URL}/logout`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setUser(null))
                toast.success(res.data.message)
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div className="bg-white">
            <div className="flex justify-between items-center mx-auto max-w-6xl h-16">
                <h1 className="text-2xl font-bold">
                    Job<span className="text-red-500">Portal</span>
                </h1>

                <div className="flex items-center gap-12">
                    <ul className="flex font-medium items-center gap-5">
                        {
                            user && user.role == "recruiter" ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) :
                                (
                                    <>
                                        <li><Link to="/">Home</Link></li>
                                        <li><Link to="/jobs">Jobs</Link></li>
                                        <li><Link to="/browse">Browse</Link></li>
                                    </>
                                )
                        }

                    </ul>

                    {!user ? (
                        <div className="flex items-center gap-2">
                            <Link to="/login">
                                <Button variant="outline">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-black hover:bg-gray-800">Signup</Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage
                                        src={user?.profile.profilePhoto || "https://github.com/shadcn.png"}
                                        alt="profilePhoto"
                                    />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-72">
                                <div className="flex gap-4">
                                    <Avatar>
                                        <AvatarImage
                                            src={user?.profile.profilePhoto || "https://github.com/shadcn.png"}
                                            alt="profilePhoto"
                                        />
                                    </Avatar>
                                    <div>
                                        <h4 className="font-medium">{user?.name}</h4>
                                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col my-2 text-gray-600">
                                    {
                                        user && user.role == "user" ? (
                                            <div className="flex w-fit items-center gap-3 cursor-pointer">
                                                <User2 />
                                                <Link to="/profile">
                                                    <Button variant="link">View Profile</Button>
                                                </Link>
                                            </div>
                                        ) : <></>
                                    }
                                    <div
                                        className="flex w-fit items-center gap-3 cursor-pointer"
                                    >
                                        <LogOut />
                                        <Button variant="link" onClick={logoutHandler}>Logout</Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;