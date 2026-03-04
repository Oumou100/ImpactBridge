"use client";

import React, { useRef } from "react";
import { Footer, Header } from "@/containers";
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
    const mainRef = useRef<HTMLElement>(null);

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
    const showHeaderFooter = !shouldHide;

    return (
        <>
            {showHeaderFooter && <Header />}
            <Main ref={mainRef}>{children}</Main>
            {showHeaderFooter && <Footer />}
        </>
    );
};