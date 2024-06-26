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
import Link from "next/link";
import { Button } from "@mui/material";




export default function BasicTable() {
  const [rows, setRows] = useState([]);
  const [phone_Numbers, setphone_Numbers] = useState([{}]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/pets", {
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

  const handlePhoneNumberChange = async (pet_id) => {
    const fetchData=async()=>{
    try {
      const k = {pet_id}
      const response = await fetch("http://localhost:5000/food", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(k),
      });

      const data = await response.json();
      console.log(data.results);
      setphone_Numbers(data.results);
      console.log(phone_Numbers);
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  };
    fetchData();
  };

  return (
    <div className="mx-10 py-10 my-20">
      <div className="max-w-5xl relative flex flex-col items-center justify-center mx-auto mb-10  w-full  ">
        <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
          Animals Details
        </h1>
      </div>
      <TableContainer
        sx={{ marginLeft: "10", marginRight: "10" }}
        component={Paper}
      >
        <Table sx={{ minWidth: 650,  backgroundColor:'grey'}} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ minWidth: 650,  backgroundColor:'#333', color:'white'}}>
            <TableCell sx={{  color:'white'}}>Animal Type</TableCell>
            <TableCell sx={{  color:'white'}} align="right">Pet_id</TableCell>
              <TableCell sx={{  color:'white'}} align="right">Gender</TableCell>
              <TableCell sx={{  color:'white'}} align="right">Age</TableCell>
              <TableCell  sx={{  color:'white'}} align="right">Breed</TableCell>
              <TableCell sx={{  color:'white'}} align="right">Weight</TableCell>
              <TableCell sx={{  color:'white'}} align="right">Sold</TableCell>
              <TableCell sx={{  color:'white'}} align="right">Food Suitable</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.pet_id}>
                <TableCell component="th" scope="row">
                  {row.typed}
                </TableCell>
                 <TableCell align="right">{row.pet_id}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell align="right">{row.age}</TableCell>
                <TableCell align="right">{row.breed}</TableCell>
                <TableCell align="right">{row.weight}</TableCell>
                <TableCell align="right">{row.sold}</TableCell>
                <TableCell align="right">
                  <button onClick={(e) => handlePhoneNumberChange(row.pet_id)}>
                  <Select >
                    {phone_Numbers.map((phoneNumber) => (
                      <MenuItem key={phoneNumber.suitable} value={phoneNumber.suitable}>
                        {phoneNumber.suitable}
                      </MenuItem>
                    ))}
                  </Select>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Link href="/AnimalForm">
          <Button sx={{ marginRight: "0", backgroundColor:"grey" }} variant="contained" >
            Add Row
          </Button>
        </Link>
      </TableContainer>
    </div>
  );
}
