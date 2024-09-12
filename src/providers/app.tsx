import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "utils/react-query";
import { AnimatePresence } from "framer-motion";
import { CircularProgress } from "@mui/material";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          <CircularProgress />
        </div>
      }
    >
      <QueryClientProvider client={queryClient}>
        {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
        <AnimatePresence mode="wait">{children}</AnimatePresence>
      </QueryClientProvider>
    </React.Suspense>
  );
};
