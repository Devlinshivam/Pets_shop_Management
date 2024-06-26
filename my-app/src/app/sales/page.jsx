"use client"
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Link from "next/link";






export default function BasicTable() {
  const [rows, setRows] = useState([]);
  const [profit, Setprofit] = useState(null);
  const [open, setOpen] = useState(false);
  const [newRowData, setNewRowData] = useState({
    pet_id: "",
    customer_id: "",
    cost: "",
    bought_date: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/sales", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data.r);
        setRows(data.r);
        console.log(data.r2[0].pro); // Output: 9500
        Setprofit(data.r2[0].pro);
        console.log(data.r2[0].pro);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


 

  

  return (
    <div className="mx-10 py-10 my-20">
      <div className="max-w-5xl relative flex flex-col items-center justify-center mx-auto mb-10  w-full  ">
        <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
          Sale Details
        </h1>
      </div>
      <TableContainer
        sx={{ marginLeft: "10", marginRight: "10" }}
        component={Paper}
      >

        <Table sx={{ minWidth: 650, backgroundColor: 'grey' }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ minWidth: 650, backgroundColor: '#333', color: 'white' }}>
              <TableCell sx={{ color: 'white' }}  >Pet_Id</TableCell>
              <TableCell sx={{ color: 'white' }} align="right">Customer_Id</TableCell>
              <TableCell sx={{ color: 'white' }} align="right">Cost</TableCell>
              <TableCell sx={{ color: 'white' }} align="right">Brought-Date</TableCell>
              {/* <TableCell sx={{ color: 'white' }} align="right">Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.pet_id}>
                <TableCell component="th" scope="row">
                  {row.pet_id}
                </TableCell>
                <TableCell align="right">{row.customer_id}</TableCell>
                <TableCell align="right">{row.cost}</TableCell>
                <TableCell align="right">{row.bought_date}</TableCell>
                {/* <TableCell align="right">
                  <button onClick={() => handleDeleteRow(index)} variant="contained" color="black">
                    Delete
                  </button>
                </TableCell> */}
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} align="right">Total Profit</TableCell>
              <TableCell align="right">{profit}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Link href="/TransactionForm">
          <Button sx={{ marginRight: "0", backgroundColor:"grey" }} variant="contained" endIcon={<SendIcon />}>
            Add Row
          </Button>
        </Link>
      </TableContainer>
    </div>
  );
}
