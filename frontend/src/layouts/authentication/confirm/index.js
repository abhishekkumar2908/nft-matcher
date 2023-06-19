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

// react-router-dom components
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import { Backdrop, CircularProgress } from "@material-ui/core";
// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import { CognitoUser, CognitoUserPool, AuthenticationDetails } from "amazon-cognito-identity-js";
import config from "../../../config";
import { useEffect } from "react";
import { toast } from "react-toastify";

const poolData = {
  UserPoolId: config.awsConfig.UserPoolId,
  ClientId: config.awsConfig.ClientId,
};

const UserPool = new CognitoUserPool(poolData);

// Images
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg";

function Cover() {
  const navigate = useNavigate();
  const location = useLocation();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [codeError, setCodeError] = useState(false);

  const handleOtp = () => {
    setLoading(true);
    let validationArr = [];

    if (code) {
      validationArr.push(false);
      setCodeError(false);
    } else {
      validationArr.push(true);
      setCodeError(true);
    }
    const user = new CognitoUser({
      Username: location.state.email,
      Pool: UserPool,
    });
    if (!validationArr.includes(true)) {
      user.confirmRegistration(code, true, (err, result) => {
        if (err) {
          console.error(err);
          toast.error("Invalid Otp!");
          setLoading(false);
        } else {
          // console.log("result of updateAttributes value is..");
          // console.log(result);
          setLoading(false);
          toast.success("authenticated successfully!");
          setTimeout(() => {
            navigate("/authentication/sign-in");
          }, 3000);
        }
      });
    } else {
      setLoading(false);
    }
  };

  return (
    <CoverLayout
      title="Confirm"
      description="We have send OTP on your email address."
      image={bgImage}
      imgPosition="top"
      button={{ color: "dark", variant: "gradient" }}
    >
      <Backdrop open={loading} style={{ zIndex: 999, color: "#fff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Card>
        <ArgonBox p={3} mb={1} textAlign="center">
          <ArgonTypography variant="h5" fontWeight="medium">
            OTP verification
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox pt={2} pb={3} px={3}></ArgonBox>
        <ArgonBox pt={2} pb={3} px={3}>
          <ArgonBox component="form" role="form">
            <ArgonBox mb={2}>
              <ArgonInput
                error={codeError}
                placeholder="OTP"
                onChange={(e) => {
                  if (e.target.value.length <= 6) {
                    setCode(e.target.value);
                  }
                }}
              />
            </ArgonBox>

            <ArgonBox mt={4} mb={1}>
              <ArgonButton
                variant="gradient"
                color="dark"
                fullWidth
                onClick={() => {
                  console.log("Handle OTP");
                  handleOtp();
                }}
              >
                Submit
              </ArgonButton>
            </ArgonBox>
          </ArgonBox>
        </ArgonBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
