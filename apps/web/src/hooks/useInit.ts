"use client";

import { useCallback } from "react";
import { useAuth } from "@/hooks";

export const useInit = () => {
  const { checkIsUserLoggedIn } = useAuth();

  const init = useCallback(() => {
    void checkIsUserLoggedIn();
  }, [checkIsUserLoggedIn]);

  return { init };
};
