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
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import TenantService from "services/TanentService";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Link,
  Snackbar,
  Typography,
} from "@mui/material";
import TenantProgreeBar from "./TenantProgreeBar";
import { useLocation } from "react-router-dom";
import ArgonButton from "components/ArgonButton";
import SyncService from "services/SyncService";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import config from "config";
import { Backdrop, CircularProgress } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";

function tanent(props) {
  const location = useLocation();
  const tanentService = new TenantService();
  const syncService = new SyncService();
  const [tanentValue, setTanentValue] = useState([]);

  const [dashboardCompleted, setDashboardCompleted] = useState(false);
  const [directoryCompleted, setDirectoryCompleted] = useState(false);
  const [customizationCompleted, setCustomizationCompleted] = useState(false);
  const [applicationCompleted, setApplicationCompleted] = useState(false);
  const [identityGovernanceCompleted, setIdentityGovernanceCompleted] = useState(false);
  const [securityCompleted, setSecurityCompleted] = useState(false);
  const [workflowCompleted, setWorkflowCompleted] = useState(false);
  const [reportsCompleted, setReportsCompleted] = useState(false);
  const [scriptRunning, setScriptRunning] = useState(false);
  const [exportRunning, setExportRunning] = useState(false);
  const [tenantReport, setTenantReport] = useState();
  const [openExport, setOpenExport] = useState(false);
  const [errorOccured, setErrorOccured] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [timeoutRunning, setTimeoutRunning] = useState(false);

  useEffect(() => {}, [
    dashboardCompleted,
    directoryCompleted,
    customizationCompleted,
    applicationCompleted,
    identityGovernanceCompleted,
    securityCompleted,
    workflowCompleted,
    reportsCompleted,
    scriptRunning,
    exportRunning,
  ]);

  useEffect(() => {
    const userId = localStorage.getItem(
      "CognitoIdentityServiceProvider." + config.awsConfig.ClientId + ".LastAuthUser"
    );
    // console.log("userId userId userId");
    // console.log(userId);
    const accessToken = localStorage.getItem(
      "CognitoIdentityServiceProvider." + config.awsConfig.ClientId + "." + userId + ".accessToken"
    );
    // console.log(accessToken);
    if (!accessToken) {
      navigate("/authentication/sign-in");
    }
    if (location.state) {
      setLoading(true);
      // setTanentValue(location.state);
      // console.log("location.state location.state v");
      // console.log(location.state);
      const tenant = location.state;
      // setTanentValue(tenant);
      syncService.syncStatueBytenantId(tenant._id).then((json) => {
        const tenantVal = json.res_object;
        setTanentValue(tenantVal);
        setDashboardCompleted(tenantVal.dashboardCompleted);
        setDirectoryCompleted(tenantVal.directoryCompleted);
        setCustomizationCompleted(tenantVal.customizationCompleted);
        setApplicationCompleted(tenantVal.applicationCompleted);
        setIdentityGovernanceCompleted(tenantVal.identityGovernanceCompleted);
        setSecurityCompleted(tenantVal.securityCompleted);
        setWorkflowCompleted(tenantVal.workflowCompleted);
        setReportsCompleted(tenantVal.reportsCompleted);
        setScriptRunning(tenantVal.scriptRunning);
        setExportRunning(tenantVal.reportGenerate);

        // getSyncStatusOfTenant(tenantVal.scriptRunning, tenantVal._id);

        setLoading(false);
      });
    }
  }, [location.state]);

  useEffect(() => {
    // console.log("useeffect when tenantVal is updated");
    // console.log(tanentValue);
    const tenent = tanentValue;
    setDashboardCompleted(tenent.dashboardCompleted);
    setDirectoryCompleted(tenent.directoryCompleted);
    setCustomizationCompleted(tenent.customizationCompleted);
    setApplicationCompleted(tenent.applicationCompleted);
    setIdentityGovernanceCompleted(tenent.identityGovernanceCompleted);
    setSecurityCompleted(tenent.securityCompleted);
    setWorkflowCompleted(tenent.workflowCompleted);
    setReportsCompleted(tenent.reportsCompleted);
    setScriptRunning(tenent.scriptRunning);
    setExportRunning(tenent.reportGenerate);
    getSyncStatusOfTenant(tenent.scriptRunning, tenent._id);
  }, [tanentValue]);

  // const handleChange = (prop, value) => {
  //   setTanentValue({ ...tanentValue, [prop]: value });
  // };

  const [loading, setLoading] = useState(false);
  const handleExportReport = () => {
    // console.log(tanentValue);
    setLoading(true);
    tanentService.exportExcelByTenantId(tanentValue).then((json) => {
      setOpenExport(true);
      setLoading(false);
      getSyncStatusOfTenantById(tanentValue._id);
    });
  };

  const handleSyncAll = async () => {
    // console.log("sync button Clicked");
    // console.log(tanentValue);
    // console.log(tanentValue._id);
    setScriptRunning(true);
    syncService.syncDataWithAutomationBytenantId(tanentValue._id).then((json) => {
      const tenantVal = json.res_object;
      setDashboardCompleted(tenantVal.dashboardCompleted);
      setDirectoryCompleted(tenantVal.directoryCompleted);
      setCustomizationCompleted(tenantVal.customizationCompleted);
      setApplicationCompleted(tenantVal.applicationCompleted);
      setIdentityGovernanceCompleted(tenantVal.identityGovernanceCompleted);
      setSecurityCompleted(tenantVal.securityCompleted);
      setWorkflowCompleted(tenantVal.workflowCompleted);
      setReportsCompleted(tenantVal.reportsCompleted);
      setScriptRunning(tenantVal.scriptRunning);
      setExportRunning(tenantVal.reportGenerate);
      setTanentValue(tenantVal);
      // getSyncStatusOfTenant(tenantVal.scriptRunning, tenantVal._id);
    });
  };

  const getSyncStatusOfTenant = (scriptRunningVal, tenantId) => {
    // console.log("getSyncStatusOfTenant");
    // console.log(timeoutRunning);
    if (!timeoutRunning) {
      // console.log("inside the getSyncStatusOfTenant if Condition");
      // console.log(scriptRunningVal);
      // console.log(tenantId);

      if (scriptRunningVal && tenantId) {
        setTimeoutRunning(true);
        const interval = setInterval(() => {
          getSyncStatusOfTenantById(tenantId);
        }, 10000);
        return () => clearInterval(interval);
      }
    }
  };

  const getSyncStatusOfTenantById = (tenantId) => {
    syncService.syncStatueBytenantId(tenantId).then((json) => {
      const tenantVal = json.res_object;
      setDashboardCompleted(tenantVal.dashboardCompleted);
      setDirectoryCompleted(tenantVal.directoryCompleted);
      setCustomizationCompleted(tenantVal.customizationCompleted);
      setApplicationCompleted(tenantVal.applicationCompleted);
      setIdentityGovernanceCompleted(tenantVal.identityGovernanceCompleted);
      setSecurityCompleted(tenantVal.securityCompleted);
      setWorkflowCompleted(tenantVal.workflowCompleted);
      setReportsCompleted(tenantVal.reportsCompleted);
      setScriptRunning(tenantVal.scriptRunning);
      setTanentValue(json.res_object);
      setExportRunning(tenantVal.reportGenerate);
    });
  };

  const getTenantDetails = async () => {
    try {
      setLoading(true);
      tanentService.getTanentDetailsById(tanentValue._id).then((response) => {
        // console.log("json json json ");
        // console.log(response);
        // if (response.status === 200) {
        setTenantReport(response.res_object);
        handleExportReport();

        // } else if (response.status === 403) {
        //   console.log("response.body");
        //   console.log(response.body);
        //   // setErrorMessage;
        // }
      });
    } catch (e) {
      console.log("exception occured");
      setErrorOccured(true);
      setErrorMessage("Something went gone wrong please try after sometime");
      setLoading(false);
    }
  };

  const handleExportClose = async () => {
    setOpenExport(false);
  };

  const handleErrorClose = async () => {
    setErrorOccured(false);
  };

  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleExportClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Backdrop open={loading} style={{ zIndex: 999, color: "#fff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ArgonBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={7} md={7}>
            <p> {tanentValue.name} </p>
          </Grid>
          <Grid item xs={2} md={2}>
            <ArgonBox>
              <ArgonButton
                // color="info"
                style={{ backgroundColor: "orange", color: "white" }}
                size="large"
                fullWidth
                disabled={!exportRunning}
                // disabled={allSyncLoading}
                onClick={() => {
                  // handleExportReport();
                  getTenantDetails();
                }}
              >
                Export
              </ArgonButton>
            </ArgonBox>
          </Grid>
          <Grid item xs={3} md={3}>
            <ArgonBox>
              <ArgonButton
                color="info"
                size="large"
                fullWidth
                disabled={scriptRunning}
                onClick={() => {
                  handleSyncAll();
                }}
              >
                {scriptRunning ? (
                  <CircularProgress style={{ width: "15px", height: "15px" }} />
                ) : (
                  "Run Assesment"
                )}
              </ArgonButton>
            </ArgonBox>
          </Grid>
        </Grid>
      </ArgonBox>

      <Card sx={{ minWidth: 275 }} style={{ padding: "10px" }}>
        <CardContent style={{ padding: "5px" }}>
          {exportRunning ? (
            <p style={{ fontSize: "12px", color: "red" }}>
              <b>This Tenant Data is Ready for export</b>
            </p>
          ) : (
            ""
          )}

          <br />
          <Grid container spacing={3}>
            <Grid item xs={3} md={3} style={{ textAlign: "center", paddingTop: "0px" }}>
              <ArgonBox py={5} style={{ textAlign: "center", paddingBottom: "35px" }}>
                <p style={{ fontSize: "16px", fontWeight: "600" }}> Dashboard </p>
                <p style={{ paddingTop: "20px" }}></p>
                {/* <TenantProgreeBar value={directoryPer} /> */}
                <p style={{ fontSize: "12px" }}>
                  <span
                    style={{
                      backgroundColor: "#E4E4E4",
                      padding: "5px 30px 5px 30px",
                      color: "blue",
                      borderRadius: "5px",
                    }}
                  >
                    {tanentValue.dashboardNew || !scriptRunning ? (
                      <b> Not Started </b>
                    ) : dashboardCompleted ? (
                      <b style={{ color: "green" }}>Done</b>
                    ) : (
                      <b>In Progress</b>
                    )}
                  </span>
                </p>
              </ArgonBox>
            </Grid>
            <Grid item xs={3} md={3} style={{ textAlign: "center", paddingTop: "0px" }}>
              <ArgonBox py={5} style={{ textAlign: "center", paddingBottom: "35px" }}>
                <p style={{ fontSize: "16px", fontWeight: "600" }}> Directory </p>
                <p style={{ paddingTop: "20px" }}></p>
                {/* <TenantProgreeBar value={directoryPer} /> */}
                <p style={{ fontSize: "12px" }}>
                  <span
                    style={{
                      backgroundColor: "#E4E4E4",
                      padding: "5px 30px 5px 30px",
                      color: "blue",
                      borderRadius: "5px",
                    }}
                  >
                    {tanentValue.directoryNew || !scriptRunning ? (
                      <b> Not Started </b>
                    ) : directoryCompleted ? (
                      <b style={{ color: "green" }}>Done</b>
                    ) : (
                      <b>In Progress</b>
                    )}
                  </span>
                </p>
              </ArgonBox>
            </Grid>
            <Grid item xs={3} md={3} style={{ textAlign: "center", paddingTop: "0px" }}>
              <ArgonBox py={5} style={{ textAlign: "center", paddingBottom: "35px" }}>
                <p style={{ fontSize: "16px", fontWeight: "600" }}> Customizations </p>
                <p style={{ paddingTop: "20px" }}></p>
                {/* <TenantProgreeBar value={directoryPer} /> */}
                <p style={{ fontSize: "12px" }}>
                  <span
                    style={{
                      backgroundColor: "#E4E4E4",
                      padding: "5px 30px 5px 30px",
                      color: "blue",
                      borderRadius: "5px",
                    }}
                  >
                    {tanentValue.customizationNew || !scriptRunning ? (
                      <b> Not Started </b>
                    ) : customizationCompleted ? (
                      <b style={{ color: "green" }}>Done</b>
                    ) : (
                      <b>In Progress</b>
                    )}
                  </span>
                </p>
              </ArgonBox>
            </Grid>
            <Grid item xs={3} md={3} style={{ textAlign: "center", paddingTop: "0px" }}>
              <ArgonBox py={5} style={{ textAlign: "center", paddingBottom: "35px" }}>
                <p style={{ fontSize: "16px", fontWeight: "600" }}> Applications </p>
                <p style={{ paddingTop: "20px" }}></p>
                {/* <TenantProgreeBar value={directoryPer} /> */}
                <p style={{ fontSize: "12px" }}>
                  <span
                    style={{
                      backgroundColor: "#E4E4E4",
                      padding: "5px 30px 5px 30px",
                      color: "blue",
                      borderRadius: "5px",
                    }}
                  >
                    {tanentValue.applicationNew || !scriptRunning ? (
                      <b> Not Started </b>
                    ) : applicationCompleted ? (
                      <b style={{ color: "green" }}>Done</b>
                    ) : (
                      <b>In Progress</b>
                    )}
                  </span>
                </p>
              </ArgonBox>
            </Grid>
            <Grid item xs={3} md={3} style={{ textAlign: "center", paddingTop: "0px" }}>
              <ArgonBox py={5} style={{ textAlign: "center", paddingBottom: "35px" }}>
                <p style={{ fontSize: "16px", fontWeight: "600" }}> Identity Governance </p>
                <p style={{ paddingTop: "20px" }}></p>
                {/* <TenantProgreeBar value={directoryPer} /> */}
                <p style={{ fontSize: "12px" }}>
                  <span
                    style={{
                      backgroundColor: "#E4E4E4",
                      padding: "5px 30px 5px 30px",
                      color: "blue",
                      borderRadius: "5px",
                    }}
                  >
                    {tanentValue.identityGovernanceNew || !scriptRunning ? (
                      <b> Not Started </b>
                    ) : identityGovernanceCompleted ? (
                      <b style={{ color: "green" }}>Done</b>
                    ) : (
                      <b>In Progress</b>
                    )}
                  </span>
                </p>
              </ArgonBox>
            </Grid>
            <Grid item xs={3} md={3} style={{ textAlign: "center", paddingTop: "0px" }}>
              <ArgonBox py={5} style={{ textAlign: "center", paddingBottom: "35px" }}>
                <p style={{ fontSize: "16px", fontWeight: "600" }}> Security </p>
                <p style={{ paddingTop: "20px" }}></p>
                {/* <TenantProgreeBar value={directoryPer} /> */}
                <p style={{ fontSize: "12px" }}>
                  <span
                    style={{
                      backgroundColor: "#E4E4E4",
                      padding: "5px 30px 5px 30px",
                      color: "blue",
                      borderRadius: "5px",
                    }}
                  >
                    {tanentValue.securityNew || !scriptRunning ? (
                      <b> Not Started </b>
                    ) : securityCompleted ? (
                      <b style={{ color: "green" }}>Done</b>
                    ) : (
                      <b>In Progress</b>
                    )}
                  </span>
                </p>
              </ArgonBox>
            </Grid>
            <Grid item xs={3} md={3} style={{ textAlign: "center", paddingTop: "0px" }}>
              <ArgonBox py={5} style={{ textAlign: "center", paddingBottom: "35px" }}>
                <p style={{ fontSize: "16px", fontWeight: "600" }}> Workflow </p>
                <p style={{ paddingTop: "20px" }}></p>
                {/* <TenantProgreeBar value={directoryPer} /> */}
                <p style={{ fontSize: "12px" }}>
                  <span
                    style={{
                      backgroundColor: "#E4E4E4",
                      padding: "5px 30px 5px 30px",
                      color: "blue",
                      borderRadius: "5px",
                    }}
                  >
                    {tanentValue.workflowNew || !scriptRunning ? (
                      <b> Not Started </b>
                    ) : workflowCompleted ? (
                      <b style={{ color: "green" }}>Done</b>
                    ) : (
                      <b>In Progress</b>
                    )}
                  </span>
                </p>
              </ArgonBox>
            </Grid>
            <Grid item xs={3} md={3} style={{ textAlign: "center", paddingTop: "0px" }}>
              <ArgonBox py={5} style={{ textAlign: "center", paddingBottom: "35px" }}>
                <p style={{ fontSize: "16px", fontWeight: "600" }}> Reports </p>
                <p style={{ paddingTop: "20px" }}></p>
                {/* <TenantProgreeBar value={directoryPer} /> */}
                <p style={{ fontSize: "12px" }}>
                  <span
                    style={{
                      backgroundColor: "#E4E4E4",
                      padding: "5px 30px 5px 30px",
                      color: "blue",
                      borderRadius: "5px",
                    }}
                  >
                    {tanentValue.reportsNew || !scriptRunning ? (
                      <b> Not Started </b>
                    ) : reportsCompleted ? (
                      <b style={{ color: "green" }}>Done</b>
                    ) : (
                      <b>In Progress</b>
                    )}
                  </span>
                </p>
              </ArgonBox>
            </Grid>
          </Grid>
          <br />
          {tenantReport ? (
            <div>
              <Grid container spacing={3}>
                <Grid item xs={2} md={2} style={{ textAlign: "center", paddingTop: "0px" }}>
                  <p>Tenant Report</p>
                </Grid>

                <Grid item xs={10} md={10} style={{ textAlign: "center" }}></Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={2} md={2} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "14px" }}>Dashboard</p>
                </Grid>
                <Grid item xs={2} md={2} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "14px" }}>Overview</p>
                </Grid>
                <Grid item xs={2} md={2} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "14px" }}>Users</p>
                  <p style={{ fontSize: "14px" }}>Groups</p>
                  <p style={{ fontSize: "14px" }}>SSO Apps</p>
                </Grid>
                <Grid item xs={2} md={2} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "14px" }}>{tenantReport.dashboard.totalUsers}</p>
                  <p style={{ fontSize: "14px" }}>{tenantReport.dashboard.totalGroups}</p>
                  <p style={{ fontSize: "14px" }}>{tenantReport.dashboard.totalApps}</p>
                </Grid>
              </Grid>
              <Grid container spacing={3} mt={1}>
                <Grid item xs={2} md={2} style={{ textAlign: "center" }}></Grid>
                <Grid item xs={2} md={2} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "14px" }}>Status</p>
                </Grid>
                <Grid item xs={2} md={2} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "14px" }}>Okta Service</p>
                  <p style={{ fontSize: "14px" }}>Agents</p>
                </Grid>
                <Grid item xs={2} md={2} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "14px" }}>{tenantReport.dashboard.oktaService}</p>
                  <p style={{ fontSize: "14px" }}>{tenantReport.dashboard.agentService}</p>
                </Grid>
              </Grid>
              <Grid container spacing={3} mt={1}>
                <Grid item xs={2} md={2} style={{ textAlign: "center" }}></Grid>
                <Grid item xs={2} md={2} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "14px" }}>Security Monitoring</p>
                </Grid>
                <Grid item xs={2} md={2} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "14px" }}>Security Monitoring</p>
                </Grid>
                <Grid item xs={2} md={2} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "14px" }}>
                    {tenantReport.dashboard.securityPercentage +
                      ", " +
                      tenantReport.dashboard.securityTaskCompleted}
                  </p>
                </Grid>
              </Grid>
              <Grid container spacing={3} mt={1}>
                <Grid item xs={2} md={2} style={{ textAlign: "center" }}></Grid>
                <Grid item xs={2} md={2} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "14px" }}>App authentication protocols</p>
                </Grid>
                <Grid item xs={2} md={2} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "14px" }}>SWA</p>
                  <p style={{ fontSize: "14px" }}>SAML</p>
                  <p style={{ fontSize: "14px" }}>OIDC</p>
                  <p style={{ fontSize: "14px" }}>Others</p>
                </Grid>
                <Grid item xs={2} md={2} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "14px" }}>{tenantReport.dashboard.swaCount}</p>
                  <p style={{ fontSize: "14px" }}>{tenantReport.dashboard.samlCount}</p>
                  <p style={{ fontSize: "14px" }}>{tenantReport.dashboard.oidcCount}</p>
                  <p style={{ fontSize: "14px" }}>{tenantReport.dashboard.othersCount}</p>
                </Grid>
              </Grid>
            </div>
          ) : (
            ""
          )}

          <Snackbar open={openExport} autoHideDuration={6000} onClose={handleExportClose}>
            <Alert onClose={handleExportClose} severity="success" sx={{ width: "100%" }}>
              This Tenant Data is deleted,if you want to export you need to run the RPA first
            </Alert>
          </Snackbar>

          <Snackbar open={errorOccured} autoHideDuration={6000} onClose={handleErrorClose}>
            <Alert onClose={handleErrorClose} severity="success" sx={{ width: "100%" }}>
              {errorMessage}
            </Alert>
          </Snackbar>
        </CardContent>
      </Card>

      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default tanent;
