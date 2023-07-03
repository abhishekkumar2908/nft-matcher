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

import { useEffect, useState } from "react";

import DialogProps from "@mui/material/Dialog";

import { Backdrop, CircularProgress } from "@material-ui/core";
import config from "config";
import { useNavigate } from "react-router-dom";

import NftService from "services/NftService";
import ImageContainer from "layouts/nftMatcher/ImageContainer";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function NftList() {
  const nftService = new NftService();
  const navigate = useNavigate();
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    // setLoading(true);
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
  }, []);

  useEffect(() => {
    setLoading(true);
    nftService
      .findAllNfts(page, 12)
      .then((json) => {
        console.log("response of find All Nft is");
        console.log(json);
        setValues(json.res_object);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error error error");
        console.log(error);
        setApiError(true);
        setLoading(false);
      });
  }, [page]);

  // }, [open, deleteTenant]);

  const handleClickTanent = (value) => {
    navigate("/tenant-detail", { state: value });
  };

  const handleEditButton = (row) => {
    console.log("currentTenant currentTenant currentTenant");
    console.log(row);
    setEditRunning(true);
    setOpen(true);
    setValues(row);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(value);
    setPage(value);
  };

  const handleFindSimilarClick = (nft) => {
    console.log("inside the Handle Find Similar Function");
    console.log(nft);

    navigate("/uploadImage", { state: nft });
  };

  const handleApiErrorClose = () => {
    setApiError(false);
  };

  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleApiErrorClose}>
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
      <p style={{ padding: "30px", fontWeight: "bold" }}>{"All Nft's"}</p>
      <Snackbar
        open={apiError}
        severity="success"
        autoHideDuration={6000}
        onClose={handleApiErrorClose}
        message="Something went wrong please try after some time."
        action={action}
      />

      <ArgonBox py={3} mt={3}>
        {values && values.length != 0 ? (
          <Grid container spacing={3} mt={3}>
            <Grid item xs={9} md={9} />
            <Grid item xs={3} md={3}>
              <Stack spacing={2}>
                <Pagination count={100} color="primary" onChange={handleChange} />
              </Stack>
            </Grid>
          </Grid>
        ) : (
          ""
        )}
        <Grid container spacing={3} mt={3}>
          {console.log(values)}
          {values &&
            values.length != 0 &&
            values.map((nft, key) => {
              const nftIdM = nft.nftId.split(".")[2];
              return (
                <React.Fragment key={key}>
                  <Grid item xs={3} md={3} style={{ padding: "25px" }}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                      // component="img"
                      // alt="green iguana"
                      // height="140"
                      // image="/static/images/cards/contemplative-reptile.jpg"
                      >
                        <ImageContainer
                          className="imageContainer"
                          imageUrl={nft.imageSmallUrl ? nft.imageSmallUrl : nft.imageOriginalUrl}
                        />
                      </CardMedia>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          <p
                            style={{
                              fontSize: "16px",
                              fontWeight: "bold",
                              margin: "0 0 8px",
                            }}
                          >
                            NFT ID:
                            {nftIdM && nftIdM.length > 15
                              ? nftIdM.substring(0, 15) + "..."
                              : nftIdM}{" "}
                            {nftIdM && nftIdM.length > 15 ? (
                              <span
                                style={{ fontSize: "12px", color: "blue", cursor: "pointer" }}
                                onClick={() => navigator.clipboard.writeText(nftIdM)}
                              >
                                copy
                              </span>
                            ) : (
                              ""
                            )}
                          </p>
                          <p style={{ fontSize: "14px", margin: "0 0 8px" }}>
                            Token ID:{" "}
                            {nft.tokenId.length > 15
                              ? nft.tokenId.substring(0, 15) + "...."
                              : nft.tokenId}
                            {nft.tokenId.length > 15 ? (
                              <span
                                style={{
                                  fontSize: "12px",
                                  color: "blue",
                                  cursor: "pointer",
                                  fontWeight: "bold",
                                }}
                                onClick={() => navigator.clipboard.writeText(nft.tokenId)}
                              >
                                copy
                              </span>
                            ) : (
                              ""
                            )}
                          </p>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <p
                            style={{
                              fontSize: "14px",
                              margin: "0",
                              overflowWrap: "break-word",
                              fontWeight: "bold",
                            }}
                          >
                            Address: {nft.address}
                          </p>
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="large"
                          onClick={() => {
                            handleFindSimilarClick(nft);
                          }}
                        >
                          Find Similar
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </React.Fragment>
              );
            })}
        </Grid>
        {values && values.length != 0 ? (
          <Grid container spacing={3} mt={3}>
            <Grid item xs={9} md={9} />
            <Grid item xs={3} md={3}>
              <Stack spacing={2}>
                <Pagination count={100} color="primary" onChange={handleChange} />
              </Stack>
            </Grid>
          </Grid>
        ) : (
          ""
        )}
        {apiError ? (
          <p style={{ textAlign: "center" }}> Something went wrong please try after some time.</p>
        ) : (
          ""
        )}
      </ArgonBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default NftList;
