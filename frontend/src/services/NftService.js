import React from "react";
import config from "config";
import AccessToken from "services/AccessToken";

const accessTokenService = new AccessToken();

export default class SyncService extends React.Component {
  findSimilarNftByImage = async (file) => {
    // axios
    // .post(getImage, formData)
    // .then((response) => {
    //   console.log("res", response.data);
    //   setSimilarNFTs(response.data);
    //   setUploadState(true);
    //   setSelectedNFT(null);
    //   setExpandedStates({});
    //   setLoading(false);
    // })
    // .catch((error) => {
    //   console.error(error);
    //   setLoading(false);
    // });

    console.log("indside findSimilarNftByImage Function");
    console.log(file);
    const formData = new FormData();
    formData.append("image", file);
    console.log(formData);

    const accessToken = await accessTokenService.getAccessToken();
    console.log(accessToken);
    return fetch(config.api.BASE_URL + "/find/any/similar/image", {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        // Authorization: "Bearer " + accessToken,
      },
      body: formData,
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  findSimilarNftByContractAddress = async (contractAddress, tokenId, chain) => {
    console.log("indside findSimilarNftByImage Function");

    const accessToken = await accessTokenService.getAccessToken();
    console.log(accessToken);
    return fetch(
      config.api.BASE_URL +
        "/find/any/similar/nft?contractAddress=" +
        contractAddress +
        "&tokenId=" +
        tokenId +
        "&chain=" +
        chain,
      {
        method: "GET",
        headers: {
          // "Content-Type": "application/json",
          //   Authorization: "Bearer " + accessToken,
        },
      }
    )
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };
}
