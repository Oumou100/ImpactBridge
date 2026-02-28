"use client";

import { PropsWithChildren, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Init } from "./init";
import { getQueryClient } from '@/api';

export const Providers = ({ children }: PropsWithChildren) => {
    const [queryClient] = useState(getQueryClient);

    return (
        <QueryClientProvider client={queryClient}>
            <Init>{children}</Init>
        </QueryClientProvider>
    );
};