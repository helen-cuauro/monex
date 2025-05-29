"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, Container } from "@mui/material";
import { Close } from "@mui/icons-material";
import Image from "next/image";

const WhatsAppBanner = () => {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = () => {
    setVisible(false);
  };

  if (!mounted) return null;

  if (!visible) return null;

  return (
    <Box
      sx={{
        backgroundColor: "#25D366",
        color: "white",
        padding: "10px 0px",
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
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp Logo"
            style={{ width: 30, height: 30, marginRight: 10 }}
            width={30}
            height={30}
          />
          <Typography variant="body1">
            <a
              href="https://wa.me/997495414?text=Hola,%20buenas,%20quisiera%20más%20información%20sobre"
              target="_blank"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Únete a nuestra comunidad de WhatsApp
            </a>
          </Typography>
        </Box>

        <IconButton onClick={handleClose} color="inherit">
          <Close />
        </IconButton>
      </Container>
    </Box>
  );
};

export default WhatsAppBanner;
