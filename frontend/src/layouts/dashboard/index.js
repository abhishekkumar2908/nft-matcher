/* eslint-disable no-unused-vars */
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

// @mui material components
import React from "react";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DetailedStatisticsCard from "examples/Cards/StatisticsCards/DetailedStatisticsCard";
import SalesTable from "examples/Tables/SalesTable";
import TenantTable from "layouts/tenantTable";
import CategoriesList from "examples/Lists/CategoriesList";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Argon Dashboard 2 MUI base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import Slider from "layouts/dashboard/components/Slider";

// Data
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import salesTableData from "layouts/dashboard/data/salesTableData";
import categoriesListData from "layouts/dashboard/data/categoriesListData";
import TenantService from "services/TanentService";
import { useEffect, useState } from "react";
import ArgonButton from "components/ArgonButton";
import Dialog from "@mui/material/Dialog";
import DialogProps from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Checkbox, FormGroup, TextField } from "@mui/material";
import ArgonInput from "components/ArgonInput";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useRoutes } from "react-router-dom";
import { Backdrop, CircularProgress } from "@material-ui/core";
import config from "config";
import { useNavigate } from "react-router-dom";
import { CheckBox } from "@mui/icons-material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
// Argon Dashboard 2 MUI components
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TanentService from "services/TanentService";

const maxWidth = React.useState < DialogProps["maxWidth"] > "500px";

function Default() {
  const tanentService = new TenantService();
  const navigate = useNavigate();
  const [tanentValue, setTanentValue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    type: "Preview",
    tenantType: "Classic",
    pushNotofication: false,
  });
  const [open, setOpen] = React.useState(false);

  const [nameError, setNameError] = React.useState(false);
  const [tenantUrlError, setTenantUrlError] = React.useState(false);
  const [tenantAdminUrlError, setTenantAdminUrlError] = React.useState(false);
  const [apiKeyError, setApiKeyError] = React.useState(false);
  const [typeError, setTypeError] = React.useState(false);
  const [tenantTypeError, setTenantTypeError] = React.useState(false);
  const [usernameError, setUsernameError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [answerError, setAnswerError] = React.useState(false);

  const [deleteTenant, setDeleteTenant] = React.useState(false);
  const [currentTenant, setCurrentTenant] = React.useState({});

  const [editRunning, setEditRunning] = React.useState(false);
  const [editUsernameRunning, setEditUsernameRunning] = React.useState(false);
  const [editPasswordRunning, setEditPasswordRunning] = React.useState(false);
  const [isStateChanged, setIsStateChanged] = React.useState(false);

  useEffect(() => {}, [
    values,
    deleteTenant,
    currentTenant,
    editRunning,
    editUsernameRunning,
    editPasswordRunning,
  ]);

  useEffect(() => {
    setLoading(true);
    const userId = localStorage.getItem(
      "CognitoIdentityServiceProvider." + config.awsConfig.ClientId + ".LastAuthUser"
    );
    console.log("userId userId userId");
    console.log(userId);
    const accessToken = localStorage.getItem(
      "CognitoIdentityServiceProvider." + config.awsConfig.ClientId + "." + userId + ".accessToken"
    );
    console.log(accessToken);
    if (!accessToken) {
      navigate("/authentication/sign-in");
    }
    // if (open || deleteTenant) {
    tanentService.getTanentsByUser().then((json) => {
      setLoading(false);
      console.log("Tenants Response is...");
      console.log(json);
      setTanentValue(json.res_object);
    });
    // }
  }, [isStateChanged]);

  // }, [open, deleteTenant]);

  const handleClickOpen = () => {
    setEditRunning(false);
    const defaultTenantVal = {
      type: "Sandbox",
      tenantType: "Classic",
      pushNotofication: false,
    };
    setValues(defaultTenantVal);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (prop, event) => {
    if (prop === "pushNotofication") {
      setValues({ ...values, [prop]: event.target.checked });
    } else {
      setValues({ ...values, [prop]: event.target.value });
    }
  };

  const handleAddTenant = () => {
    setLoading(true);
    let validationArr = [];

    if (values.name) {
      validationArr.push(false);
      setNameError(false);
    } else {
      validationArr.push(true);
      setNameError(true);
    }

    if (values.tenantUrl) {
      validationArr.push(false);
      setTenantUrlError(false);
    } else {
      validationArr.push(true);
      setTenantUrlError(true);
    }

    if (values.tenantAdminUrl) {
      validationArr.push(false);
      setTenantAdminUrlError(false);
    } else {
      validationArr.push(true);
      setTenantAdminUrlError(true);
    }

    // if (values.apiKey) {
    //   validationArr.push(false);
    //   setApiKeyError(false);
    // } else {
    //   validationArr.push(true);
    //   setApiKeyError(true);
    // }

    if (values.type) {
      validationArr.push(false);
      setTypeError(false);
    } else {
      validationArr.push(true);
      setTypeError(true);
    }

    if (values.tenantType) {
      validationArr.push(false);
      setTenantTypeError(false);
    } else {
      validationArr.push(true);
      setTenantTypeError(true);
    }

    if (values.userName) {
      validationArr.push(false);
      setUsernameError(false);
    } else {
      validationArr.push(true);
      setUsernameError(true);
    }

    if (values.password) {
      validationArr.push(false);
      setPasswordError(false);
    } else {
      validationArr.push(true);
      setPasswordError(true);
    }

    if (!validationArr.includes(true)) {
      try {
        if (editRunning) {
          tanentService.updateTenant(values).then((json) => {
            console.log("Udapte Added Response is....");
            console.log(json);
            setLoading(false);
            setOpen(false);
            setIsStateChanged(isStateChanged ? false : true);
          });
        } else {
          tanentService.addTenant(values).then((json) => {
            console.log("Tenant Added Response is....");
            console.log(json);
            setLoading(false);
            setOpen(false);
            setIsStateChanged(isStateChanged ? false : true);
          });
        }
      } catch (e) {
        console.log(e);
        console.log(e.message);
      }
    } else {
      setLoading(false);
    }
  };

  const handleClickTanent = (value) => {
    navigate("/tenant-detail", { state: value });
  };

  const handleDeleteTenant = () => {
    console.log(currentTenant._id);
    if (currentTenant && currentTenant._id) {
      setLoading(true);
      tanentService.deleteTanentById(currentTenant._id).then((json) => {
        console.log("json of delete Tenant");
        console.log(json);
        setLoading(false);
        setDeleteTenant(false);
        setIsStateChanged(isStateChanged ? false : true);
      });
    }
  };

  const handleDeleteTenantClose = () => {
    setDeleteTenant(false);
  };

  const handleEditButton = (row) => {
    console.log("currentTenant currentTenant currentTenant");
    console.log(row);
    setEditRunning(true);
    setOpen(true);
    setValues(row);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Backdrop open={loading} style={{ zIndex: 999, color: "#fff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ArgonBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} style={{ textAlign: "right" }}>
            <ArgonButton
              style={{ backgroundColor: "#11cdef" }}
              onClick={() => {
                console.log("button clicked");
                handleClickOpen();
              }}
            >
              <Icon sx={{ fontWeight: "bold" }}>add</Icon> {"  "}Add Tenant
            </ArgonButton>
          </Grid>
          <Grid item xs={12} md={12}>
            {/* <TenantTable title="Tanents" rows={tanentValue} /> */}
            <TableContainer sx={{ height: "100%", width: "100%" }} component={Paper}>
              <Table sx={{ minWidth: "100%" }} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell style={{ fontSize: "14px" }}>Name</TableCell>
                    <TableCell style={{ fontSize: "14px" }}>Tenant Url</TableCell>
                    <TableCell style={{ fontSize: "14px" }}>Tenant Admin Url</TableCell>
                    <TableCell style={{ fontSize: "14px" }}>Type</TableCell>
                    <TableCell style={{ fontSize: "14px" }}>Created On</TableCell>
                    <TableCell style={{ fontSize: "14px" }}>Actions</TableCell>
                  </TableRow>
                  {tanentValue &&
                    tanentValue.map((row, key) => {
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
                                  handleClickTanent(row);
                                }}
                              >
                                <u>{row.name}</u>
                              </p>
                            </TableCell>
                            <TableCell style={{ fontSize: "14px" }}>{row.tenantUrl}</TableCell>
                            <TableCell style={{ fontSize: "14px" }}>{row.tenantAdminUrl}</TableCell>
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
                                  setCurrentTenant(row);
                                  // setOpen(true);
                                  handleEditButton(row);
                                }}
                              />
                              <DeleteIcon
                                style={{ color: "red", marginLeft: "10px", cursor: "pointer" }}
                                onClick={() => {
                                  console.log("Delete Button Clicked");
                                  setDeleteTenant(true);
                                  setCurrentTenant(row);
                                  // handleDeleteTenant(row);
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
          </Grid>
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth={true}
          maxWidth={"sm"}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{ textAlign: "center", padding: "0px" }}>
            <div style={{ backgroundColor: "#FFA500", height: "60px" }}>
              <p style={{ padding: "15px" }}>{"Enter okta Tenant details"}</p>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Backdrop open={loading} style={{ zIndex: 999, color: "#fff" }}>
                <CircularProgress color="inherit" />
              </Backdrop>
              <Grid container spacing={3} mt={1}>
                <Grid item xs={1} md={1} />
                <Grid item xs={10} md={10}>
                  <ArgonBox>
                    <ArgonBox mb={2}>
                      <p style={{ fontSize: "12px" }}>
                        Tenant type <span style={{ color: "red" }}>*</span>
                      </p>
                      <FormControl style={{ marginLeft: "15px", marginTop: "10px" }}>
                        <RadioGroup
                          row
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue={values.tenantType}
                          name="radio-buttons-group-types"
                          onChange={(event) => {
                            console.log("event Changed");
                            console.log(event.target.value);
                            handleChange("tenantType", event);
                          }}
                        >
                          <FormControlLabel
                            value="Classic"
                            control={<Radio />}
                            label="Classic"
                            style={{ fontSize: "12px", fontWeight: "100 !important" }}
                          />
                          <FormControlLabel
                            value="OIE"
                            control={<Radio />}
                            label="OIE"
                            style={{ fontSize: "12px", marginLeft: "10px" }}
                          />
                        </RadioGroup>
                      </FormControl>
                    </ArgonBox>
                    <ArgonBox mb={2}>
                      <ArgonInput
                        error={nameError}
                        type="text"
                        placeholder="IAM System name *"
                        size="large"
                        value={values.name}
                        onChange={(event) => {
                          handleChange("name", event);
                        }}
                      />
                    </ArgonBox>
                    <ArgonBox mb={2}>
                      <ArgonInput
                        error={tenantUrlError}
                        type="text"
                        placeholder="IAM System URL* ( https://YourDomain.oktapreview.com )"
                        size="large"
                        value={values.tenantUrl}
                        onChange={(event) => {
                          handleChange("tenantUrl", event);
                        }}
                      />
                    </ArgonBox>
                    <ArgonBox mb={2}>
                      <ArgonInput
                        error={tenantAdminUrlError}
                        type="text"
                        placeholder="IAM System admin URL* ( https://YourDomain-admin.oktapreview.com )"
                        size="large"
                        value={values.tenantAdminUrl}
                        onChange={(event) => {
                          handleChange("tenantAdminUrl", event);
                        }}
                      />
                    </ArgonBox>
                    {/* <ArgonBox mb={2}>
                      <ArgonInput
                        error={apiKeyError}
                        type="text"
                        placeholder="IAM System API token"
                        size="large"
                        value={values.apiKey}
                        onChange={(event) => {
                          handleChange("apiKey", event);
                        }}
                      />
                    </ArgonBox> */}
                    <ArgonBox mb={2}>
                      <ArgonInput
                        error={usernameError}
                        type={editUsernameRunning ? "password" : "text"}
                        placeholder="User Email *"
                        size="large"
                        value={values.userName}
                        onChange={(event) => {
                          handleChange("userName", event);
                        }}
                        onFocus={(event) => {
                          console.log("On Focus ");
                          setEditUsernameRunning(false);
                        }}
                        onBlur={(event) => {
                          console.log("onFocusOut");
                          setEditUsernameRunning(true);
                        }}
                      />
                    </ArgonBox>

                    <ArgonBox mb={2}>
                      <ArgonInput
                        error={passwordError}
                        type={editPasswordRunning ? "password" : "text"}
                        placeholder="Password *"
                        size="large"
                        value={values.password}
                        onChange={(event) => {
                          handleChange("password", event);
                        }}
                        onFocus={(event) => {
                          console.log("On Focus ");
                          setEditPasswordRunning(false);
                        }}
                        onBlur={(event) => {
                          console.log("onFocusOut");
                          setEditPasswordRunning(true);
                        }}
                      />
                    </ArgonBox>

                    {/* {values.tenantType === "Classic" ? (
                      <FormControl sx={{ ml: 2, mb: 1 }} component="fieldset" variant="standard">
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.pushNotofication}
                                onChange={(event) => {
                                  console.log(event.target.checked);
                                  handleChange("pushNotofication", event);
                                }}
                                name="PushNotofication"
                              />
                            }
                            label="Checked if you setup Push Notofication."
                          />
                        </FormGroup>
                      </FormControl>
                    ) : (
                      ""
                    )} */}
                    {values.tenantType === "Classic" ? (
                      <p style={{ fontSize: "11px", color: "red" }}>
                        <b>{`if you setup Push Notofication then you don't need to answer`}</b>
                      </p>
                    ) : (
                      ""
                    )}
                    {values.tenantType === "Classic" ? (
                      <ArgonBox mb={2}>
                        <ArgonInput
                          error={answerError}
                          type="text"
                          placeholder="Answer of Question *"
                          size="large"
                          value={values.answer}
                          onChange={(event) => {
                            handleChange("answer", event);
                          }}
                        />
                      </ArgonBox>
                    ) : (
                      ""
                    )}
                    <ArgonBox mb={2}>
                      <p style={{ fontSize: "12px" }}>
                        Tenant type <span style={{ color: "red" }}>*</span>
                      </p>
                      <FormControl style={{ marginLeft: "15px", marginTop: "10px" }}>
                        <RadioGroup
                          row
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue={values.type}
                          name="radio-buttons-group"
                          onChange={(event) => {
                            console.log("event Changed");
                            console.log(event.target.value);
                            handleChange("type", event);
                          }}
                        >
                          <FormControlLabel
                            value="Preview"
                            control={<Radio />}
                            label="Preview"
                            style={{ fontSize: "12px", fontWeight: "100 !important" }}
                          />
                          <FormControlLabel
                            value="Production"
                            control={<Radio />}
                            label="Production"
                            style={{ fontSize: "12px", marginLeft: "10px" }}
                          />
                        </RadioGroup>
                      </FormControl>
                    </ArgonBox>
                  </ArgonBox>
                </Grid>
                <Grid item xs={1} md={1} />
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                console.log("button Clicked");
                console.log(values);

                handleAddTenant();
              }}
              autoFocus
            >
              {editRunning ? "Update" : "Save"}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={deleteTenant}
          onClose={handleDeleteTenantClose}
          fullWidth={true}
          maxWidth={"sm"}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{ padding: "0px" }}>
            <div style={{ height: "30px" }}>
              <p style={{ padding: "15px", color: "red" }}> Confirm</p>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Backdrop open={loading} style={{ zIndex: 999, color: "#fff" }}>
                <CircularProgress color="inherit" />
              </Backdrop>
              <Grid container spacing={3} mt={3}>
                <Grid item xs={1} md={1} />
                <Grid item xs={10} md={10}>
                  <ArgonBox>
                    <p>
                      Are you sure to delete <b>{currentTenant.name}</b> tenant
                    </p>
                  </ArgonBox>
                </Grid>
                <Grid item xs={1} md={1} />
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleDeleteTenantClose();
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                console.log("button Clicked");
                // console.log(values);
                handleDeleteTenant();
              }}
              autoFocus
              style={{ backgroundColor: "red", color: "white" }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </ArgonBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Default;
