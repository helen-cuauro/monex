"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Image from "next/image";

interface ExchangeService {
  name: string;
  buy: number;
  sell: number;
  url: string;
  logo: string;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function DollarExchange() {
  const [services, setServices] = useState<ExchangeService[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/exchangeServices");
        const data = await res.json();

        if (!lastUpdate || new Date(data.updatedAt) > new Date(lastUpdate)) {
          setServices(data.services);
          setLastUpdate(new Date(data.updatedAt));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 60000); // Cada 60 segundos

    return () => clearInterval(interval);
  }, [lastUpdate]);

  // Crear grupos de 3 servicios
  const chunkSize = 3;
  const serviceChunks = [];
  for (let i = 0; i < services.length; i += chunkSize) {
    serviceChunks.push(services.slice(i, i + chunkSize));
  }

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ padding: "16px" }}>
        Cambio Online
      </Typography>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          {/* Encabezado se mantiene igual */}
          <TableRow>
            <StyledTableCell>Revisa quien está cambiando</StyledTableCell>

            <StyledTableCell align="right">Compra</StyledTableCell>
            <StyledTableCell align="right">Venta</StyledTableCell>
            {/* Repetir para 3 columnas */}
            <StyledTableCell></StyledTableCell>

            <StyledTableCell align="right">Compra</StyledTableCell>
            <StyledTableCell align="right">Venta</StyledTableCell>
            <StyledTableCell></StyledTableCell>

            <StyledTableCell align="right">Compra</StyledTableCell>
            <StyledTableCell align="right">Venta</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {serviceChunks.map((chunk, index) => (
            <StyledTableRow key={index}>
              {[...Array(3)].map((_, position) => {
                const service = chunk[position];
                return service ? (
                  <React.Fragment key={service.name}>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      sx={{ display: "flex", gap: "20px" }}
                    >
                      <Image
                        width={85}
                        height={30}
                        src={service.logo}
                        alt={service.name}
                      ></Image>
                      <Button variant="contained" href={service.url}>
                        CAMBIAR
                      </Button>
                    </StyledTableCell>

                    <StyledTableCell align="right">
                      {service.buy.toFixed(3)}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {service.sell.toFixed(3)}
                    </StyledTableCell>
                  </React.Fragment>
                ) : (
                  // Celdas vacías para mantener el diseño
                  <React.Fragment key={position}>
                    <StyledTableCell component="th" scope="row" />
                    <StyledTableCell align="right" />
                    <StyledTableCell align="right" />
                  </React.Fragment>
                );
              })}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DollarExchange;
