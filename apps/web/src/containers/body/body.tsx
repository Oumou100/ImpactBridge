"use client";

import React, { useEffect, useRef, useState } from "react";
import { Footer, Header } from "@/containers";
import { Spinner } from "@/components/common";
import { usePathname } from "next/navigation";

const Main = React.forwardRef<HTMLElement, React.PropsWithChildren>(
    ({ children }, ref) => {
        return <main ref={ref}>{children}</main>;
    },
);
Main.displayName = "Main";

type BodyProps = React.PropsWithChildren;

export const Body: React.FC<BodyProps> = ({ children }) => {
    const pathname = usePathname();
    const [showHeaderFooter, setShowHeaderFooter] = useState(true);
    const [isClient, setIsClient] = useState(false);
    const mainRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        // Hide header and footer in these routes
        const routesToHide = [
            "/connexion",
            "/inscription",
            "/mot-de-passe-oublie",
            "/verification",
            "/reinitialiser-mot-de-passe",
            "/administration",
        ];

        const adminRoutes = ["/administration"];

        const shouldHide =
            routesToHide.includes(pathname) ||
            adminRoutes.some((route) => pathname.startsWith(route));

        setShowHeaderFooter(!shouldHide);
    }, [pathname]);

    if (!isClient)
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Spinner className="text-sky-800 text-6xl" />
            </div>
        );

    return (
        <>
            {showHeaderFooter && <Header />}
            <Main ref={mainRef}>{children}</Main>
            {showHeaderFooter && <Footer />}
        </>
    );
};