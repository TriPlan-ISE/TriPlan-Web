import { useRouter } from "next/router";
import RouteButton from "./RouteButton";
import useMediaQuery from "@/hooks/useMediaQuery";
import React from "react";
import MobileSidebar from "./MobileSidebar";
import NavbarRight from "./NavbarRight";
import NavbarLogo from "./NavbarLogo";
import MobileLeft from "./MobileLeft";
import SearchBar from "../Search/SearchBar";
import TagsButton from "../Search/TagsButton";
import { Button } from "@mui/material";

interface IProps {
    user: unknown;
    isLoading: boolean;
}

const leftList = [
    {
        name: "Home",
        route: "/",
    },
    {
        name: "Plan",
        route: "/plan",
    },
];

const rightListLogin = [
    {
        name: "Login",
        route: "/api/auth/login",
    },
];

const rightListLogout = [
    {
        name: "Profile",
        route: "/profile",
    },
    {
        name: "Signout",
        route: "/api/auth/logout",
    },
];

const Navbar = ({ user, isLoading }: IProps) => {
    const router = useRouter();
    const isLargerThanMedium = useMediaQuery("(min-width: 800px)");
    const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);
    const calculateMobileList = () => {
        return user && !isLoading
            ? [
                  ...leftList,
                  { name: "Search", route: "/search" },
                  "divider",
                  { name: "Register Place", route: "/register" },
                  "divider",
                  "profile",
                  rightListLogout[0],
                  "upgrade",
                  rightListLogout[1],
              ]
            : [
                  ...leftList,
                  { name: "Search", route: "/search" },
                  "divider",
                  { name: "Register Place", route: "/register" },
                  "divider",
                  "profile",
                  ...rightListLogin,
              ];
    };
    const [mobileList, setMobileList] = React.useState<Array<any>>(
        calculateMobileList()
    );
    React.useEffect(() => {
        console.log(mobileList);
        setMobileList(calculateMobileList());
    }, [user, isLoading]);
    return (
        <div className="fixed w-full z-[100] top-0 left-0 select-none">
            <div
                id="navbar"
                className="relative bg-white flex gap-1 items-center place-items-center 
                justify-between h-[64px] text-neutral-600"
            >
                {isLargerThanMedium ? (
                    <>
                        <div className="flex pl-3 text-md">
                            <NavbarLogo />
                            <div className="grid grid-flow-col gap-1 ml-3">
                                {leftList.map((navItem) => (
                                    <RouteButton
                                        name={navItem.name}
                                        route={navItem.route}
                                    />
                                ))}
                                <SearchBar />
                                <TagsButton />
                            </div>
                            <Button
                                onClick={() => {
                                    router.push("/register");
                                }}
                                variant="outlined"
                                color="primary"
                                sx={{
                                    height: "2rem",
                                    borderRadius: "999px",
                                    borderColor: "black",
                                    color: "black",
                                    marginY: "auto",
                                    marginLeft: "0.75rem",
                                    textTransform: "none",
                                    "&:hover": {
                                        color: "black",
                                        backgroundColor: "Gainsboro",
                                        borderColor: "gray",
                                    },
                                }}
                            >
                                <div className="m-auto text-xs font-montserrat whitespace-nowrap">
                                    + Register Place
                                </div>
                            </Button>
                        </div>
                        <NavbarRight isLoading={isLoading} user={user} />
                    </>
                ) : (
                    <div className=" w-full">
                        <MobileSidebar
                            list={mobileList}
                            openDrawer={openDrawer}
                            setOpenDrawer={setOpenDrawer}
                            user={user}
                        />
                        <MobileLeft setOpenDrawer={setOpenDrawer} />
                    </div>
                )}
            </div>
            <div className="flex w-full h-1 bg-gradient-to-r from-tricolorgreen to-yellow-300" />
        </div>
    );
};
export default Navbar;
