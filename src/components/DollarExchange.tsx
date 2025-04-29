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
import Button from "@mui/material/Button";

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

function createData(
  name: string,
  button: string,
  compra: number,
  venta: number,
  url: string
) {
  return { name, button, compra, venta, url };
}

const rows = [
  createData("Western Union", "CAMBIAR", 3.725, 3.752, "/western-union"),
  createData("Cambia Fx", "CAMBIAR", 3.725, 3.752, "/cambia-fx"),
  createData("DichiKASH", "CAMBIAR", 3.725, 3.752, "/dichikash"),
];

export default function DollarExchange() {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ padding: "16px" }}>
        Cambio Online
      </Typography>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
            <StyledTableCell align="right">Compra</StyledTableCell>
            <StyledTableCell align="right">Venta</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button variant="contained" component="a" href={row.url}>
                  {row.button}
                </Button>
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
