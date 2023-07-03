import React, { useState, useEffect } from "react";
import "layouts/style/ImageUploadComponent.css";

// ...........ImageContainer has image url from which image will be displayed..................
import ImageContainer from "./ImageContainer";
// ............................backend api.....................................................
import { getImage } from "layouts/APIs/endPoint";

// ..................for additional information from opensea...................................
import AssetInformationComponent from "layouts/nftMatcher/AssetInformationComponent";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ArgonBox from "components/ArgonBox";
import Grid from "@mui/material/Grid";
import { Backdrop, CircularProgress } from "@material-ui/core";
import NftService from "services/NftService";
import ArgonInput from "components/ArgonInput";
import { Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import config from "config";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function ImageUploadComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState("");
  const [fileName, setFileName] = useState("");
  const [similarNFTs, setSimilarNFTs] = useState([]);
  const [uploadState, setUploadState] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [expandedStates, setExpandedStates] = useState(false);
  const [index, setIndex] = useState([]);
  const [loading, setLoading] = useState(false);

  const [contractAddressError, setContractAddressError] = useState(false);
  const [tokenIdError, setTokenIdError] = useState(false);
  const [chainError, setChainError] = useState(false);

  const [nftValues, setNftValues] = useState({
    contractAddress: "",
    tokenId: "",
    chain: "ethereum",
  });

  const nftService = new NftService();

  const Alert =
    React.forwardRef <
    HTMLDivElement >
    function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    };

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
    console.log("inside the useEffect of LocationChanged");
    console.log(location.state);
    if (location && location.state) {
      const val = location.state;
      const value12 = {
        contractAddress: val.address,
        tokenId: val.tokenId,
        chain: val.provider,
      };
      setNftValues(value12);
      findImageByContractAddress(value12);
    }
  }, [location.state]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log("selectedFile selectedFile");
    console.log(selectedFile);
    setFile(selectedFile);

    setFilePath(URL.createObjectURL(event.target.files[0]));
    setFileName(selectedFile.name);
  };

  const [apiError, setApiError] = useState(false);

  const handleSubmit = () => {
    // event.preventDefault();
    setLoading(true);

    nftService
      .findSimilarNftByImage(file)
      .then((response) => {
        console.log("response response response");
        console.log(response);
        setSimilarNFTs(response);
        setUploadState(true);
        setSelectedNFT(null);
        setExpandedStates({});
        setApiError(false);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error error error");
        console.log(error);
        setApiError(true);
        setLoading(false);
      });
  };

  // ................this function will be called when user clicks on More button..............
  const handleMoreClick = (nft) => {
    setIndex((prev) => [...prev, nft.nftId]);

    setSelectedNFT((prevSelectedNFT) => {
      if (prevSelectedNFT && prevSelectedNFT.id === nft.nftId) {
        return null;
      } else {
        return nft;
      }
    });
    setExpandedStates((prevExpandedStates) => ({
      ...prevExpandedStates,
      [nft.nftId]: !prevExpandedStates[nft.nftId],
    }));
  };

  useEffect(() => {
    if (fileName !== "") {
      setUploadState(false);
    }
  }, [fileName]);

  const findImageByContractAddress = (nftValues1) => {
    setLoading(true);
    console.log("findImageByContractAddress....");

    let validationArr = [];

    console.log("1");
    console.log(nftValues1.contractAddress);
    if (nftValues1.contractAddress) {
      validationArr.push(false);
      setContractAddressError(false);
    } else {
      validationArr.push(true);
      setContractAddressError(true);
    }

    console.log("2");
    if (nftValues1.tokenId) {
      validationArr.push(false);
      setTokenIdError(false);
    } else {
      validationArr.push(true);
      setTokenIdError(true);
    }

    if (nftValues1.chain) {
      validationArr.push(false);
      setTokenIdError(false);
    } else {
      validationArr.push(true);
      setTokenIdError(true);
    }

    console.log("3");
    if (!validationArr.includes(true)) {
      console.log("4");
      nftService
        .findSimilarNftByContractAddress(
          nftValues1.contractAddress,
          nftValues1.tokenId,
          nftValues1.chain
        )
        .then((json) => {
          console.log("response of Similaar Nft By ContractAddress");
          console.log(json);
          setSimilarNFTs(json);
          setUploadState(true);
          setSelectedNFT(null);
          setExpandedStates({});
          setLoading(false);
        })
        .catch((error) => {
          console.log("error error error");
          console.log(error);
          setApiError(true);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  const handleChange = (prop, event) => {
    setNftValues({ ...nftValues, [prop]: event.target.value });
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
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <ArgonBox py={3}>
          <Backdrop open={loading} style={{ zIndex: 999, color: "#fff" }}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <Grid container spacing={3} pt={5} style={{ marginTop: "10px" }}>
            <Grid
              item
              xs={6}
              md={6}
              style={{ borderRight: "1px solid black", borderBottom: "1px solid black" }}
            >
              <div className="upload-container">
                <h2 className="title">Upload an Image to search similar image</h2>
                <Snackbar
                  open={apiError}
                  severity="success"
                  autoHideDuration={6000}
                  onClose={handleApiErrorClose}
                  message="Something went wrong please try after some time."
                  action={action}
                />
                <Grid container spacing={3}>
                  <Grid item xs={7} md={7} style={{ marginTop: "50px", textAlign: "center" }}>
                    {/* <form onSubmit={handleSubmit} className="form"> */}
                    <div className="form-group">
                      <label htmlFor="imageInput" className="file-label">
                        <input
                          type="file"
                          id="imageInput"
                          onChange={(event) => {
                            handleFileChange(event);
                          }}
                          className="file-input"
                        />
                        <span className="file-cta">{fileName ? fileName : "Choose File"}</span>
                      </label>
                    </div>

                    <button
                      // type="submit"
                      className="upload-button"
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      Find
                    </button>
                    {/* </form> */}
                  </Grid>
                  <Grid item xs={5} md={5}>
                    <img src={filePath} height={200} />
                  </Grid>
                </Grid>
              </div>
            </Grid>
            {/* <Grid item xs={1} md={1}> */}
            <div style={{ position: "absolute", top: "50%", left: "47.5%" }}>
              <p
                style={{
                  border: "1px solid black",
                  padding: "10px",
                  borderRadius: "30px",
                  backgroundColor: "#007bff",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                OR
              </p>
            </div>
            {/* </Grid> */}
            {/* <Grid item xs={1} md={1}></Grid> */}
            <Grid item xs={5} md={5} style={{ borderBottom: "1px solid black" }}>
              <div className="upload-container" style={{ marginTop: "50px", marginLeft: "30px" }}>
                <ArgonBox mb={2}>
                  <ArgonInput
                    error={contractAddressError}
                    type="text"
                    placeholder="Enter Contract Address"
                    size="large"
                    value={nftValues.contractAddress}
                    onChange={(event) => {
                      handleChange("contractAddress", event);
                    }}
                  />
                </ArgonBox>
                <ArgonBox mb={2}>
                  <ArgonInput
                    error={tokenIdError}
                    type="text"
                    placeholder="Enter Token Id"
                    size="large"
                    value={nftValues.tokenId}
                    onChange={(event) => {
                      handleChange("tokenId", event);
                    }}
                  />
                </ArgonBox>

                <ArgonBox mb={2}>
                  <span style={{ fontSize: "14px" }}>Select Chain: </span>
                  <FormControl sx={{ m: 1 }} style={{ width: "300px" }}>
                    {/* <InputLabel id="demo-simple-select-autowidth-label">Select Chain</InputLabel> */}
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      error={chainError}
                      value={nftValues.chain}
                      onChange={(event) => {
                        handleChange("chain", event);
                      }}
                      // label="Age"
                      sx={{ height: "100px" }}
                    >
                      <MenuItem value={"ethereum"}>Ethereum</MenuItem>
                    </Select>
                  </FormControl>
                </ArgonBox>

                <div style={{ textAlign: "center" }}>
                  <button
                    // type="submit"
                    className="upload-button"
                    onClick={() => {
                      findImageByContractAddress(nftValues);
                    }}
                    // style={{ marginTop: "20px" }}
                  >
                    Find
                  </button>
                </div>
              </div>
            </Grid>
            <Grid item xs={1} md={1} style={{ borderBottom: "1px solid black" }}></Grid>
          </Grid>
        </ArgonBox>

        {/* <div>
          <p>Note: </p>
        </div> */}
        {uploadState && similarNFTs && similarNFTs.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "nowrap",
              justifyContent: "left",
              gap: "20px",
            }}
          >
            <Grid container spacing={3}>
              {similarNFTs.map((nft, key) => {
                const splitId = nft.nftId.split(".");
                console.log("splitId splitId splitId");
                console.log(splitId);
                const mainNftId = splitId[2];
                console.log(mainNftId);
                const nftIdM = nft.nftId.split(".")[2];
                return (
                  <React.Fragment key={key}>
                    <Grid item xs={3} md={3} style={{ padding: "25px" }}>
                      <Card sx={{ maxWidth: 345 }}>
                        <CardMedia>
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
                          <a
                            href={
                              "https://opensea.io/assets/ethereum/" + nft.address + "/" + mainNftId
                            }
                            style={{ fontSize: "14px", fontWeight: "bold" }}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Visit website for more details.
                          </a>
                          {/* <Button
                            size="large"
                            onClick={() => {
                              handleFindSimilarClick(nft);
                            }}
                          >
                            Find Similar
                          </Button> */}
                        </CardActions>
                      </Card>
                      {/* <div style={{ marginTop: "10px" }}>
                      <ImageContainer className="imageContainer" imageUrl={nft.imageOriginalUrl} />
                      <p
                        style={{
                          fontSize: "14px",
                          margin: "0",
                          overflowWrap: "break-word",
                        }}
                      >
                        Address: {nft.address}
                      </p>
                      <div style={{ textAlign: "center", marginTop: "10px", color: "black" }}>
                        <button className="expansion-button" style={{ color: "black" }}>
                          Find Similar
                        </button>
                      </div>
                       
                    </div> */}
                    </Grid>
                  </React.Fragment>
                  // <div key={nft.id} style={{ display: "flex" }} className="container_item">
                  //   <Grid item xs={2} md={2} style={{ maxWidth: "100%" }}>
                  //     {/* <div style={{ position: "relative" }}> */}
                  //     <ImageContainer className="imageContainer" imageUrl={nft.imageOriginalUrl} />
                  //     {/* </div> */}
                  //     {/* </Grid> */}
                  //     {/* <Grid item xs={5} md={5}> */}
                  //     <div style={{ marginTop: "10px" }}>
                  //       <p
                  //         style={{
                  //           fontSize: "16px",
                  //           fontWeight: "bold",
                  //           margin: "0 0 8px",
                  //         }}
                  //       >
                  //         NFT ID: {nft.nftId}
                  //       </p>
                  //       <p style={{ fontSize: "14px", margin: "0 0 8px" }}>
                  //         Token ID: {nft.tokenId}
                  //       </p>
                  //       <p
                  //         style={{
                  //           fontSize: "14px",
                  //           margin: "0",
                  //           overflowWrap: "break-word",
                  //         }}
                  //       >
                  //         Address: {nft.address}
                  //       </p>
                  //       {/* <button onClick={() => handleMoreClick(nft)} className="expansion-button">
                  //       {expandedStates[nft.nftId] ? "Less" : "More"}
                  //     </button> */}
                  //       <a
                  //         href={
                  //           "https://opensea.io/assets/ethereum/" + nft.address + "/" + mainNftId
                  //         }
                  //         style={{ fontSize: "14px" }}
                  //         target="_blank"
                  //         rel="noreferrer"
                  //       >
                  //         Visit website for more details.
                  //       </a>
                  //     </div>
                  //   </Grid>

                  //   {expandedStates[nft.nftId] && (
                  //     <div style={{ marginLeft: "20px" }}>
                  //       {selectedNFT ? (
                  //         <div style={{ marginTop: "1px", display: "flex" }}>
                  //           <AssetInformationComponent nft={selectedNFT} index={index} />
                  //         </div>
                  //       ) : null}
                  //     </div>
                  //   )}
                  // </div>
                );
              })}
            </Grid>
          </div>
        ) : (
          uploadState && <p className="title">No similar NFTs found.</p>
        )}
      </DashboardLayout>
    </>
  );
}

export default ImageUploadComponent;
