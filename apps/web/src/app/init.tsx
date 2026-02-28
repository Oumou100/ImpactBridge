"use client";

import { PropsWithChildren, useEffect } from "react";
import { useInit } from "@/hooks";

export const Init = ({ children }: PropsWithChildren) => {
    const { init } = useInit();

    useEffect(() => {
        init();
    }, []);

    return <>{children}</>;
};