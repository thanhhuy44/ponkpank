"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

function Providers({ children }: { children: ReactNode | ReactNode[] }) {
  return <ThemeProvider attribute="class" defaultTheme="light">
    {children}
  </ThemeProvider>;
}

export default Providers;
