"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, Container, Link } from "@mui/material";
import { Close } from "@mui/icons-material";

const BannerAdvertise = () => {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = () => {
    setVisible(false);
  };

  if (!mounted || !visible) return null;

  return (
    <Box
      sx={{
        backgroundColor: "#FACC15",
        color: "white",
        py: 1.5,
        width: "100%",
        zIndex: 1000,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          textAlign: {
            xs: "center",
            sm: "left",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: {
              xs: "center",
              sm: "flex-start",
            },
            mb: { xs: 1, sm: 0 },
          }}
        >
          <Typography variant="body1" sx={{ mr: { sm: 2 }, fontSize: 14 }}>
            ¿Quieres anunciar tu negocio de cambio de divisas?
            <br />
            Envía una solicitud para promocionar tu negocio y llegar a más
            clientes.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: {
              xs: "center",
              sm: "flex-end",
            },
            mt: { xs: 1, sm: 0 },
          }}
        >
          <Link
            href="/form"
            rel="noopener noreferrer"
            sx={{
              color: "#22C55E",
              fontWeight: "bold",
              textDecoration: "underline",
              ml: { xs: 0, sm: 1 },
              "&:hover": {
                color: "white",
              },
            }}
          >
            Solicitar Anuncio
          </Link>
          <IconButton
            onClick={handleClose}
            sx={{ color: "white", ml: { xs: 1, sm: 2 } }}
          >
            <Close />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default BannerAdvertise;
