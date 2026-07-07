"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import LenisProvider from "@/components/LenisProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <LenisProvider>
        {children}
        <Toaster 
          theme="dark" 
          position="bottom-right" 
          closeButton 
          richColors 
          toastOptions={{
            style: {
              background: "oklch(0.09 0 0)",
              border: "1px solid oklch(1 0 0 / 8%)",
              color: "oklch(0.98 0 0)",
            }
          }}
        />
      </LenisProvider>
    </QueryClientProvider>
  );
}
