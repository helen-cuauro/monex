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
import Box from "@mui/material/Box";

interface DollarPrice {
  entity: string;
  buy: number;
  sell: number;
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

export default function DollarPrice() {
  const [prices, setPrices] = useState<DollarPrice[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dollarPrices");
        const data = await response.json();
        setPrices(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Agrupar en chunks de 2
  const chunkSize = 2;
  const priceChunks = [];
  for (let i = 0; i < prices.length; i += chunkSize) {
    priceChunks.push(prices.slice(i, i + chunkSize));
  }

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ padding: "16px" }}>
        Precio del dólar en Perú
      </Typography>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Entidad</StyledTableCell>
            <StyledTableCell align="right">Compra</StyledTableCell>
            <StyledTableCell align="right">Venta</StyledTableCell>
            <StyledTableCell>Entidad</StyledTableCell>
            <StyledTableCell align="right">Compra</StyledTableCell>
            <StyledTableCell align="right">Venta</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {priceChunks.map((chunk, index) => (
            <StyledTableRow key={index}>
              {[...Array(2)].map((_, pos) => {
                const item = chunk[pos];
                return item ? (
                  <React.Fragment key={item.entity}>
                    <StyledTableCell component="th" scope="row">
                      <Box display="flex" alignItems="center" gap={1}>
                        {item.entity}
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.buy.toFixed(3)}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.sell.toFixed(3)}
                    </StyledTableCell>
                  </React.Fragment>
                ) : (
                  <React.Fragment key={pos}>
                    <StyledTableCell />
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
