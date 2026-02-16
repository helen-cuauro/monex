"use client";

import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // Crear cache dentro del componente usando useMemo para consistencia
  const cache = React.useMemo(
    () =>
      createCache({
        key: "mui",
        prepend: true,
      }),
    []
  );

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}

