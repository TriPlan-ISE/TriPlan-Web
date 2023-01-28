import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const NavbarLogo = () => {
    const router = useRouter();
    return (
        <div onClick={() => router.push("/")} className="flex">
            <Image
                className="w-[40px] h-[30px]"
                src={"http://localhost:3000" + "/images/logo.png"}
                alt="Profile picture"
                width={40}
                height={30}
            />
            <div className="text-2xl font-bold mx-2">TRIPLAN</div>
        </div>
    );
};

export default NavbarLogo;