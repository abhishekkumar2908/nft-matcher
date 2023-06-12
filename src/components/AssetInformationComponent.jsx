import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AssetInformationComponent({ nft }) {
  const [assetInfo, setAssetInfo] = useState([]);

  useEffect(() => {
    const fetchAssetInfo = async () => {
      try {
        const response = await axios.get(`https://testnets-api.opensea.io/api/v1/asset/${nft.address}/${nft.tokenId}/`);
        if (response && response.data) {
          setAssetInfo([response.data]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (nft.tokenId && nft.address) {
        fetchAssetInfo();
      }
}, [nft]);



  return (
    <div>
      {assetInfo.length > 0 ? (
        <div>
          <p>TokenId: {assetInfo[0].token_id}</p>
          <p>Description: {assetInfo[0].description}</p>
          <p>Number of Sales: {assetInfo[0].num_sales}</p>
          <p>Chain Identifier: {assetInfo[0]?.asset_contract?.chain_identifier}</p>
          
        </div>
      ) : (
        <p>Fetching...</p>
      )}
    </div>
  );
}

export default AssetInformationComponent;
