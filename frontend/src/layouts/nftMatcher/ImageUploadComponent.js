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

function ImageUploadComponent() {
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

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log("selectedFile selectedFile");
    console.log(selectedFile);
    setFile(selectedFile);

    setFilePath(URL.createObjectURL(event.target.files[0]));
    setFileName(selectedFile.name);
  };

  const handleSubmit = () => {
    // event.preventDefault();
    setLoading(true);
    // const formData = new FormData();
    // formData.append("image", file);
    // axios
    //   .post(getImage, formData)
    //   .then((response) => {
    //     console.log("res", response.data);
    //     setSimilarNFTs(response.data);
    //     setUploadState(true);
    //     setSelectedNFT(null);
    //     setExpandedStates({});
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     setLoading(false);
    //   });
    nftService.findSimilarNftByImage(file).then((response) => {
      console.log("response response response");
      console.log(response);
      setSimilarNFTs(response);
      setUploadState(true);
      setSelectedNFT(null);
      setExpandedStates({});
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

  const findImageByContractAddress = () => {
    setLoading(true);
    console.log("findImageByContractAddress....");

    let validationArr = [];

    console.log("1");
    if (nftValues.contractAddress) {
      validationArr.push(false);
      setContractAddressError(false);
    } else {
      validationArr.push(true);
      setContractAddressError(true);
    }

    console.log("2");
    if (nftValues.tokenId) {
      validationArr.push(false);
      setTokenIdError(false);
    } else {
      validationArr.push(true);
      setTokenIdError(true);
    }

    if (nftValues.chain) {
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
          nftValues.contractAddress,
          nftValues.tokenId,
          nftValues.chain
        )
        .then((json) => {
          console.log("response of Similaar Nft By ContractAddress");
          console.log(json);
          setSimilarNFTs(json);
          setUploadState(true);
          setSelectedNFT(null);
          setExpandedStates({});
          setLoading(false);
        });
    }
  };

  const handleChange = (prop, event) => {
    setNftValues({ ...nftValues, [prop]: event.target.value });
  };

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <ArgonBox py={3}>
          <Backdrop open={loading} style={{ zIndex: 999, color: "#fff" }}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <Grid container spacing={3}>
            <Grid item xs={5} md={5}>
              <div className="upload-container">
                <h2 className="title">Upload an Image to search similar image</h2>
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
            <Grid item xs={1} md={1}>
              <div style={{ marginTop: "100px" }}>
                <p>OR</p>
              </div>
            </Grid>
            <Grid item xs={5} md={5}>
              <div className="upload-container" style={{ marginTop: "50px" }}>
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
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Select Chain</InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      error={chainError}
                      value={nftValues.chain}
                      onChange={(event) => {
                        handleChange("chain", event);
                      }}
                      fullWidth
                      label="Age"
                    >
                      <MenuItem value={"ethereum"}>Ethereum</MenuItem>
                    </Select>
                  </FormControl>
                </ArgonBox>

                <button
                  // type="submit"
                  className="upload-button"
                  onClick={() => {
                    findImageByContractAddress();
                  }}
                  // style={{ marginTop: "20px" }}
                >
                  Find
                </button>
              </div>
            </Grid>
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
              {similarNFTs.map((nft) => {
                const splitId = nft.nftId.split(".");
                console.log("splitId splitId splitId");
                console.log(splitId);
                const mainNftId = splitId[2];
                console.log(mainNftId);
                return (
                  <div key={nft.id} style={{ display: "flex" }} className="container_item">
                    <Grid item xs={2} md={2} style={{ maxWidth: "100%" }}>
                      {/* <div style={{ position: "relative" }}> */}
                      <ImageContainer className="imageContainer" imageUrl={nft.imageOriginalUrl} />
                      {/* </div> */}
                      {/* </Grid> */}
                      {/* <Grid item xs={5} md={5}> */}
                      <div style={{ marginTop: "10px" }}>
                        <p
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            margin: "0 0 8px",
                          }}
                        >
                          NFT ID: {nft.nftId}
                        </p>
                        <p style={{ fontSize: "14px", margin: "0 0 8px" }}>
                          Token ID: {nft.tokenId}
                        </p>
                        <p
                          style={{
                            fontSize: "14px",
                            margin: "0",
                            overflowWrap: "break-word",
                          }}
                        >
                          Address: {nft.address}
                        </p>
                        {/* <button onClick={() => handleMoreClick(nft)} className="expansion-button">
                        {expandedStates[nft.nftId] ? "Less" : "More"}
                      </button> */}
                        <a
                          href={
                            "https://opensea.io/assets/ethereum/" + nft.address + "/" + mainNftId
                          }
                          style={{ fontSize: "14px" }}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Visit website for more details.
                        </a>
                      </div>
                    </Grid>

                    {expandedStates[nft.nftId] && (
                      <div style={{ marginLeft: "20px" }}>
                        {selectedNFT ? (
                          <div style={{ marginTop: "1px", display: "flex" }}>
                            <AssetInformationComponent nft={selectedNFT} index={index} />
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
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
