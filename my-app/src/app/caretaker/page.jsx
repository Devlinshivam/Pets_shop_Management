"use client"
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";


export default function BasicTable() {
  const [rows, setRows] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/caretaker", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data.results);
        setRows(data.results);
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
          Caretaker Details
        </h1>
      </div>
      <TableContainer
        sx={{ marginLeft: "10", marginRight: "10" }}
        component={Paper}
      >
        <Table sx={{ minWidth: 650,  backgroundColor:'grey'}} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ minWidth: 650,  backgroundColor:'#333', color:'white'}}>
              <TableCell sx={{  color:'white'}}>Caretaker Name</TableCell>
              <TableCell sx={{  color:'white'}} align="right">Caretaker_id</TableCell>
              <TableCell sx={{  color:'white'}} align="right">Age</TableCell>
              <TableCell sx={{  color:'white'}} align="right">Salary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.customer_id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.caretaker_id}</TableCell>
                <TableCell align="right">{row.age}</TableCell>
                <TableCell align="right">{row.salary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
