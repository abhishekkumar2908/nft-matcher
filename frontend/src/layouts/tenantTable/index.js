/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
// Argon Dashboard 2 MUI components
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TanentService from "services/TanentService";

function TanentTable({ title, rows }) {
  const navigate = useNavigate();
  const tanentService = new TanentService();
  const handleAddTanent = (value) => {
    navigate("/tenant-detail", { state: value });
  };

  const handleDeleteTenant = (tenant) => {
    console.log(tenant._id);
    // tanentService.deleteTanentById(tenant._id)
  };

  return (
    <TableContainer sx={{ height: "100%", width: "100%" }} component={Paper}>
      <Table sx={{ minWidth: "100%" }} aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell style={{ fontSize: "14px" }}>Name</TableCell>
            <TableCell style={{ fontSize: "14px" }}>Tanent Url</TableCell>
            <TableCell style={{ fontSize: "14px" }}>Api Key</TableCell>
            <TableCell style={{ fontSize: "14px" }}>Type</TableCell>
            <TableCell style={{ fontSize: "14px" }}>Created On</TableCell>
            <TableCell style={{ fontSize: "14px" }}>Actions</TableCell>
          </TableRow>
          {rows.map((row, key) => {
            return (
              <React.Fragment key={key}>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  style={{ fontSize: "14px" }}
                >
                  <TableCell>
                    <p
                      style={{ cursor: "pointer", color: "blue", fontSize: "14px" }}
                      onClick={() => {
                        handleAddTanent(row);
                      }}
                    >
                      <u>{row.name}</u>
                    </p>
                  </TableCell>
                  <TableCell style={{ fontSize: "14px" }}>{row.tenantUrl}</TableCell>
                  <TableCell style={{ fontSize: "14px" }}>{row.apiKey}</TableCell>
                  <TableCell style={{ fontSize: "14px" }}>{row.type}</TableCell>
                  <TableCell style={{ fontSize: "14px" }}>
                    {" "}
                    {moment(row.createdDate).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell style={{ fontSize: "18px", cursor: "pointer" }}>
                    <EditIcon
                      style={{ color: "blue" }}
                      onClick={() => {
                        console.log("Edit Button Clicked");
                      }}
                    />
                    <DeleteIcon
                      style={{ color: "red", marginLeft: "10px", cursor: "pointer" }}
                      onClick={() => {
                        console.log("Delete Button Clicked");
                        handleDeleteTenant(row);
                      }}
                    />
                  </TableCell>
                </TableRow>
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// Setting default values for the props of SalesTable
TanentTable.defaultProps = {
  rows: [{}],
};

// Typechecking props for the SalesTable
TanentTable.propTypes = {
  title: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf(PropTypes.object),
};

export default TanentTable;
