"use client";

import { create } from "zustand";

interface Store {
    globalLoaderCount: number;
    startGlobalLoader: () => void;
    stopGlobalLoader: () => void;
}

export const useGlobalLoaderStore = create<Store>()((set) => ({
    globalLoaderCount: 0,
    startGlobalLoader: () =>
        set(({ globalLoaderCount }) => {
            return {
                globalLoaderCount: globalLoaderCount + 1,
            };
        }),
    stopGlobalLoader: () =>
        set(({ globalLoaderCount }) => {
            if (globalLoaderCount === 0) {
                console.error(
                    "Unbalanced global loading start/stop calls detected:\n " +
                    "stopGlobalLoader action was called more times than startGlobalLoader",
                );
                return { globalLoaderCount };
            }

            return {
                globalLoaderCount: globalLoaderCount - 1,
            };
        }),
}));