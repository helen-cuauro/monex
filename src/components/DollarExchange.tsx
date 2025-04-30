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

interface ExchangeService {
  name: string;
  compra: number;
  venta: number;
  url: string;
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/exchangeServices');
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ padding: "16px" }}>
        Cambio Online
      </Typography>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Entidad Financiera</StyledTableCell>
            <StyledTableCell align="right">Acción</StyledTableCell>
            <StyledTableCell align="right">Compra</StyledTableCell>
            <StyledTableCell align="right">Venta</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map((service) => (
            <StyledTableRow key={service.name}>
              <StyledTableCell component="th" scope="row">
                {service.name}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button variant="contained" href={service.url}>
                  CAMBIAR
                </Button>
              </StyledTableCell>
              <StyledTableCell align="right">{service.compra}</StyledTableCell>
              <StyledTableCell align="right">{service.venta}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DollarExchange;