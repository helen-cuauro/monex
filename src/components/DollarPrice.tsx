"use client";
import * as React from "react";
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
import GavelIcon from "@mui/icons-material/Gavel";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

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

function createData(entidad: string, compra: number, venta: number) {
  return { entidad, compra, venta };
}

const rows = [
  createData("Sunat", 3.725, 3.752),
  createData("Paralelo", 3.725, 3.752),
];

export default function DollarPrice() {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ padding: "16px" }}>
        Precio del dólar en Perú
      </Typography>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align="right">Compra</StyledTableCell>
            <StyledTableCell align="right">Venta</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.entidad}>
              <StyledTableCell component="th" scope="row">
                <Box display="flex" alignItems="center" gap={1}>
                  {row.entidad === "Sunat" && <GavelIcon />}
                  {row.entidad === "Paralelo" && <CurrencyExchangeIcon />}
                  <Typography>{row.entidad}</Typography>
                </Box>
              </StyledTableCell>
              <StyledTableCell align="right">{row.compra}</StyledTableCell>
              <StyledTableCell align="right">{row.venta}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
