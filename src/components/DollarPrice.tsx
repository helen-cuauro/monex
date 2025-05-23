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
import GavelIcon from "@mui/icons-material/Gavel";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import Image from "next/image";

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
          {prices.map((price) => (
            <StyledTableRow key={price.entity}>
              <StyledTableCell component="th" scope="row">
                <Box display="flex" alignItems="center" gap={1}>
                  {price.entity === "Sunat" && (
                    <svg width="25" height="26">
                      <svg
                        width="25"
                        height="26"
                        viewBox="0 0 25 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="12.5"
                          cy="13"
                          r="12"
                          stroke="black"
                        ></circle>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M17.0807 15.5076C17.1561 15.0893 17.2385 14.6724 17.3068 14.2527C17.4702 13.2416 16.9301 12.3284 15.9379 12.1015C15.1191 11.9143 14.2704 11.8562 13.4374 11.7342C12.6798 11.6236 11.8951 11.5924 11.1701 11.3698C10.06 11.028 9.23549 10.336 9.10471 9.07112C9.04074 8.45427 9.19995 7.88847 9.61929 7.44462C10.5262 6.48743 11.4644 5.56145 12.3955 4.62695C12.7039 4.3164 13.1901 4.34192 13.5028 4.65106C14.4396 5.57705 15.3863 6.49311 16.3217 7.42193C16.94 8.03736 17.5399 8.67265 18.1568 9.28808C18.7368 9.86523 19.3452 10.414 19.9081 11.0053C20.1555 11.2648 20.4938 11.4634 20.5506 11.8859C20.626 12.4503 20.2009 12.6957 19.8825 13.0048C19.2414 13.6259 18.5861 14.2328 17.9351 14.8426C17.6749 15.0865 17.412 15.3247 17.149 15.5658C17.1262 15.5459 17.1035 15.5261 17.0822 15.5062L17.0807 15.5076Z"
                          fill="black"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8.81501 10.0116C8.75104 10.3491 8.68139 10.6114 8.65438 10.878C8.61742 11.2481 8.59041 11.6211 8.5961 11.9926C8.61031 12.9001 9.37934 13.4234 10.1086 13.6205C11.1079 13.8914 12.1342 13.9339 13.162 13.9651C14.0547 13.992 14.8905 14.2289 15.6396 14.7195C16.3745 15.2002 16.7839 15.9163 16.8266 16.7672C16.8536 17.2947 16.5977 17.808 16.2324 18.2164C15.8102 18.69 15.3624 19.141 14.9147 19.5919C14.4314 20.0812 13.9381 20.5619 13.4448 21.0412C13.2501 21.2312 12.6815 21.2553 12.4839 21.0653C11.948 20.5491 11.4249 20.0188 10.8989 19.4927C10.4696 19.0644 10.0418 18.6333 9.61389 18.2037C8.97564 17.5641 8.34165 16.9203 7.70055 16.2836C7.09641 15.6852 6.48517 15.0939 5.88103 14.4955C5.73035 14.3466 5.58109 14.1934 5.45174 14.0247C5.26836 13.7864 5.27405 13.4362 5.49012 13.1937C5.75736 12.8931 6.05445 12.6165 6.34586 12.3386C7.14616 11.5785 7.95073 10.8227 8.81216 10.0087L8.81501 10.0116Z"
                          fill="black"
                        ></path>
                      </svg>
                    </svg>
                  )}
                  {price.entity === "Paralelo" && <CurrencyExchangeIcon />}
                  <Typography>{price.entity}</Typography>
                </Box>
              </StyledTableCell>
              <StyledTableCell align="right">{price.buy}</StyledTableCell>
              <StyledTableCell align="right">{price.sell}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
