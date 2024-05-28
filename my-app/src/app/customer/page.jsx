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
import Button from "@mui/material/Button";
import Link from "next/link";

export default function BasicTable() {
  const [rows, setRows] = useState([]);
  const [phone_Numbers, setphone_Numbers] = useState([{}]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/customers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setRows(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePhoneNumberChange = async (customerId) => {
    
    try {
      const response = await fetch("http://localhost:5000/phone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerId }),
      });

      const data = await response.json();
      setphone_Numbers(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (customerId) => {
    try {
      // Your delete logic here
      console.log("Delete customer with ID:", customerId);
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <div className="mx-10 py-10 my-20">
      <div className="max-w-5xl relative flex flex-col items-center justify-center mx-auto mb-10  w-full  ">
        <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
          Customer Details
        </h1>
      </div>
      <TableContainer
        sx={{ marginLeft: "10", marginRight: "10" }}
        component={Paper}
      >
        <Table
          sx={{ minWidth: 650, backgroundColor: "grey" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow
              sx={{ minWidth: 650, backgroundColor: "#333", color: "white" }}
            >
              <TableCell sx={{ color: "white" }}>Customer Name</TableCell>
              <TableCell sx={{ color: "white" }}>Customer ID</TableCell>
              <TableCell sx={{ color: "white" }} align="right">
                Gender
              </TableCell>
              <TableCell sx={{ color: "white" }} align="right">
                Age
              </TableCell>
              <TableCell sx={{ color: "white" }} align="right">
                Address
              </TableCell>
              <TableCell sx={{ color: "white" }} align="right">
                Phone Number
              </TableCell>
              {/* <TableCell sx={{ color: "white" }} align="right">
                Actions
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.customer_id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.customer_id}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell align="right">{row.age}</TableCell>
                <TableCell align="right">{row.address}</TableCell>
                <TableCell align="right">
                  <Select
                    value=""
                    onClick={(e) => handlePhoneNumberChange(row.customer_id)}
                  >
                    {phone_Numbers.map((phoneNumber) => (
                      <MenuItem
                        key={phoneNumber.number}
                        value={phoneNumber.number}
                      >
                        {phoneNumber.number}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                {/* <TableCell align="right">
                  <Button
                    variant="contained"
                    color="inherit"
                    sx={{
                      backgroundColor: "#333",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#222", // Darken the background color on hover
                      },
                    }}
                    onClick={() => handleDelete(row.customer_id)}
                  >
                    Delete
                  </Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>

        </Table>
        <Link href="/CustomerForm">
          <Button sx={{ marginRight: "0", backgroundColor:"grey" }} variant="contained" >
            Add Row
          </Button>
        </Link>
      </TableContainer>
    </div>
  );
}