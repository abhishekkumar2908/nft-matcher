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
import * as React from "react";
import { useState, useEffect } from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
import DefaultNavbarLink from "examples/Navbars/DefaultNavbar/DefaultNavbarLink";
// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";

// Argon Dashboard 2 MUI example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Argon Dashboard 2 MUI context
import {
  useArgonController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

// Images
import nftImage from "assets/images/matcher/nft-matcher.png";
import team2 from "assets/images/team-2.jpg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import config from "config";
import { useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress } from "@material-ui/core";

import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const poolData = {
  UserPoolId: config.awsConfig.UserPoolId,
  ClientId: config.awsConfig.ClientId,
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

function DashboardNavbar({ absolute, light, isMini }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    console.log("handle Click");
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useArgonController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const navigate = useNavigate();
  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    const user = userPool.getCurrentUser();
    user.signOut(() => {
      console.log("logout Successfull...");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("email");
      navigate("/authentication/sign-in");
    });
  };

  return (
    <AppBar
      position={"fixed"}
      color="inherit"
      style={{ backgroundColor: "#5ba2ee" }}
      // sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Backdrop open={loading} style={{ zIndex: 999, color: "#fff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toolbar sx={(theme) => navbarContainer(theme, { navbarType })}>
        <ArgonBox
          // color={light && transparentNavbar ? "white" : "dark"}
          mb={{ xs: 1, md: 0 }}
          sx={(theme) => navbarRow(theme, { isMini })}
        >
          <Link to="/">
            <ArgonTypography
              component="span"
              variant="body2"
              color={light ? "white" : "dark"}
              // opacity={light ? 0.8 : 0.5}
              sx={{ lineHeight: 0 }}
              style={{ fontSize: "20px" }}
            >
              {/* <p style={{ color: "White" }}>
                <b>NFT Matcher</b>
              </p> */}
              <img
                src={nftImage}
                alt="NFT Matcher"
                style={{
                  // width: "100px", // Adjust the width and height as needed
                  height: "80px",
                  // verticalAlign: "middle",
                  // color: "white",
                  marginLeft: "50px",
                }}
              />{" "}
            </ArgonTypography>
          </Link>
        </ArgonBox>
        {isMini ? null : (
          <ArgonBox sx={(theme) => navbarRow(theme, { isMini })}>
            <ArgonBox color={light ? "black" : "inherit"}>
              <ArgonBox display={{ xs: "none", lg: "flex" }} m={0} p={0}>
                <Link to="/">
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      marginRight: "20px",
                      color: "White",
                      marginTop: "6px",
                    }}
                  >
                    Home
                  </p>
                </Link>
                <Link to="/nfts">
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      marginRight: "100px",
                      color: "White",
                      marginTop: "6px",
                    }}
                  >
                    See All Nft
                  </p>
                </Link>

                {localStorage.getItem("email") ? (
                  // <Link to="#">
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    style={{ color: "white" }}
                  >
                    <span style={{ marginTop: "5px" }}>
                      <Icon
                        sx={({ palette: { dark, white } }) => ({
                          color: light && transparentNavbar ? white.main : dark.main,
                        })}
                      >
                        account_circle
                      </Icon>
                    </span>

                    <span style={{ marginLeft: "5px" }}>{localStorage.getItem("email")}</span>
                  </Button>
                ) : (
                  // </Link>
                  <Link to="/authentication/sign-in">
                    <IconButton sx={navbarIconButton} size="small">
                      <Icon
                        sx={({ palette: { dark, white } }) => ({
                          color: light && transparentNavbar ? white.main : dark.main,
                        })}
                      >
                        account_circle
                      </Icon>
                      <ArgonTypography
                        variant="button"
                        fontWeight="medium"
                        // color={light && transparentNavbar ? "white" : "dark"}
                      >
                        Sign in
                      </ArgonTypography>
                    </IconButton>
                  </Link>
                )}

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      // handleLogout();
                      console.log("My Account Button Clicked.");
                    }}
                  >
                    My account
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
                {/* {localStorage.getItem("email") ? (
                  // <Link to="/authentication/sign-in">
                  <p
                    style={{
                      fontSize: "14px",
                      color: "black",
                      fontWeight: 600,
                      cursor: "pointer",
                      textAlign: "right",
                    }}
                    onClick={() => {
                      console.log("logout Clicked...");
                      handleLogout();
                    }}
                  >
                    LOGOUT
                  </p>
                ) : (
                  // </Link>
                  ""
                )} */}
              </ArgonBox>

              {/* {renderMenu()} */}
            </ArgonBox>
          </ArgonBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: true,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
