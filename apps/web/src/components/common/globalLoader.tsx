
"use client";

import { Spinner } from "@/components";
import { useGlobalLoaderStore } from "@/stores";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const GlobalLoader = () => {
    const { globalLoaderCount } = useGlobalLoaderStore();
    const [isGlobalLoading, setIsGlobalLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        setIsGlobalLoading(globalLoaderCount > 0);
    }, [globalLoaderCount]);

    useEffect(() => {
        if (isGlobalLoading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "initial";
        }
    }, [isGlobalLoading]);

    if (!mounted || !isGlobalLoading) return null;

    return createPortal(
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70">
            <Spinner className="text-white text-6xl" />
        </div>,
        document.body,
    );
};
