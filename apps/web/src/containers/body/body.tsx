"use client";

import React, { useEffect, useRef, useState } from "react";
import { Footer, Header } from "@/containers";
import { Spinner } from "@/components/common";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants";

const Main = React.forwardRef<HTMLElement, React.PropsWithChildren>(
    ({ children }, ref) => {
        return <main ref={ref}>{children}</main>;
    },
);
Main.displayName = "Main";

type BodyProps = React.PropsWithChildren;

export const Body: React.FC<BodyProps> = ({ children }) => {
    const pathname = usePathname();
    const [showHeader, setShowHeader] = useState(true);
    const [showFooter, setShowFooter] = useState(true);
    const [isClient, setIsClient] = useState(false);
    const mainRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        const isAdminRoute = pathname.startsWith(ROUTES.ADMIN_DASHBOARD);
        const isAdminLogin = pathname === ROUTES.ADMIN_LOGIN;

        setShowHeader(!isAdminLogin);
        setShowFooter(!isAdminRoute && !isAdminLogin);
    }, [pathname]);

    if (!isClient)
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Spinner className="text-sky-800 text-6xl" />
            </div>
        );

    return (
        <>
            {showHeader && <Header />}
            <Main ref={mainRef}>{children}</Main>
            {showFooter && <Footer />}
        </>
    );
};
