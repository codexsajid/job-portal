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
        <div className="bg-white w-full">
            <div className="flex justify-between items-center w-full mx-auto max-w-6xl h-auto sm:h-16 px-3 sm:px-6 lg:px-8 py-2 sm:py-0">
                <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold whitespace-nowrap">
                    Job<span className="text-red-500">Portal</span>
                </h1>

                <div className="flex items-center gap-1 sm:gap-3 md:gap-6 lg:gap-12 flex-wrap">
                    <ul className="flex font-medium items-center gap-1 sm:gap-2 md:gap-3 lg:gap-5 text-xs sm:text-sm md:text-base ">
                        {
                            user && user.role == "recruiter" ? (
                                <>
                                    <li className="px-1 sm:px-0"><Link to="/admin/companies">Companies</Link></li>
                                    <li className="px-1 sm:px-0"><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) :
                                (
                                    <>
                                        <li className="px-1 sm:px-0"><Link to="/">Home</Link></li>
                                        <li className="px-1 sm:px-0"><Link to="/jobs">Jobs</Link></li>
                                        <li className="px-1 sm:px-0"><Link to="/browse">Browse</Link></li>
                                    </>
                                )
                        }

                    </ul>

                    {!user ? (
                        <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                            <Link to="/login">
                                <Button variant="outline" className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-black hover:bg-gray-800 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2">Signup</Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer w-8 h-8 sm:w-10 sm:h-10">
                                    <AvatarImage
                                        src={user?.profile.profilePhoto || "https://github.com/shadcn.png"}
                                        alt="profilePhoto"
                                    />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-60 sm:w-72 text-xs sm:text-sm">
                                <div className="flex gap-3 sm:gap-4">
                                    <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                                        <AvatarImage
                                            src={user?.profile.profilePhoto || "https://github.com/shadcn.png"}
                                            alt="profilePhoto"
                                        />
                                    </Avatar>
                                    <div>
                                        <h4 className="font-medium text-xs sm:text-sm">{user?.name}</h4>
                                        <p className="text-xs sm:text-sm text-muted-foreground break-all">{user?.email}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col my-2 text-gray-600 text-xs sm:text-sm">
                                    {
                                        user && user.role == "user" ? (
                                            <div className="flex w-fit items-center gap-2 sm:gap-3 cursor-pointer">
                                                <User2 size={16} />
                                                <Link to="/profile">
                                                    <Button variant="link" className="text-xs sm:text-sm p-0">View Profile</Button>
                                                </Link>
                                            </div>
                                        ) : <></>
                                    }
                                    <div
                                        className="flex w-fit items-center gap-2 sm:gap-3 cursor-pointer"
                                    >
                                        <LogOut size={16} />
                                        <Button variant="link" onClick={logoutHandler} className="text-xs sm:text-sm p-0">Logout</Button>
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