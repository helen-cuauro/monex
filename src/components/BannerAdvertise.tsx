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
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
          <Typography variant="body1" sx={{ mr: 2 }}>
            ¿Quieres anunciar tu negocio de cambio de divisas?
            <br />
            Envía una solicitud para promocionar tu negocio y llegar a más
            clientes.
          </Typography>
        </Box>
        <div>
          <Link
            href="/form"
            rel="noopener noreferrer"
            sx={{
              color: "#22C55E", 
              fontWeight: "bold",
              textDecoration: "underline",
              ml: 1,
              "&:hover": {
                color: "white",
              },
            }}
          >
            Solicitar Anuncio
          </Link>
          <IconButton onClick={handleClose} sx={{ color: "white", ml: 2 }}>
            <Close />
          </IconButton>
        </div>
      </Container>
    </Box>
  );
};

export default BannerAdvertise;
