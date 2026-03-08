import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2, Bookmark, Moon, Sun } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import { setAllCompany, setSingleCompany } from "../redux/companySlice";
import { setAllAdminJobs } from "../redux/jobSlice";
import { toast } from "sonner";
import { USER_END_POINT_URL } from "../utiles/urls";
import axios from "axios";
import useDarkMode from "../hook/useDarkMode";

const Navbar = () => {
    const user = useSelector((store) => store.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useDarkMode();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_END_POINT_URL}/logout`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setUser(null))
                dispatch(setAllCompany([]))
                dispatch(setSingleCompany(null))
                dispatch(setAllAdminJobs([]))
                toast.success(res.data.message)
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border shadow-sm transition-all duration-300">
            <div className="flex justify-between items-center w-full mx-auto max-w-6xl h-auto sm:h-16 px-3 sm:px-6 lg:px-8 py-2 sm:py-0">
                <Link to="/">
                    <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black tracking-tight whitespace-nowrap hover:opacity-90 transition-opacity">
                        Job<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Portal</span>
                    </h1>
                </Link>

                <div className="flex items-center gap-1 sm:gap-3 md:gap-6 lg:gap-12 flex-wrap">
                    <ul className="flex font-medium items-center gap-1 sm:gap-2 md:gap-3 lg:gap-5 text-xs sm:text-sm md:text-base">
                        {
                            user && user.role == "recruiter" ? (
                                <>
                                    <li className="px-1 sm:px-0"><Link to="/admin/companies" className="hover:text-primary transition-colors">Companies</Link></li>
                                    <li className="px-1 sm:px-0"><Link to="/admin/jobs" className="hover:text-primary transition-colors">Jobs</Link></li>
                                </>
                            ) :
                                (
                                    <>
                                        <li className="px-1 sm:px-0"><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                                        <li className="px-1 sm:px-0"><Link to="/jobs" className="hover:text-primary transition-colors">Jobs</Link></li>
                                        <li className="px-1 sm:px-0"><Link to="/browse" className="hover:text-primary transition-colors">Browse</Link></li>
                                    </>
                                )
                        }

                    </ul>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                    >
                        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    </Button>

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

                                <div className="flex flex-col my-2 text-muted-foreground text-xs sm:text-sm">
                                    <>
                                        <div className="flex w-fit items-center gap-2 sm:gap-3 cursor-pointer">
                                            <User2 size={16} />
                                            <Link to="/profile">
                                                <Button variant="link" className="text-xs sm:text-sm p-0">View Profile</Button>
                                            </Link>
                                        </div>
                                        {user && user.role === "user" && (
                                            <div className="flex w-fit items-center gap-2 sm:gap-3 cursor-pointer">
                                                <Bookmark size={16} />
                                                <Link to="/saved-jobs">
                                                    <Button variant="link" className="text-xs sm:text-sm p-0">Saved Jobs</Button>
                                                </Link>
                                            </div>
                                        )}
                                    </>
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