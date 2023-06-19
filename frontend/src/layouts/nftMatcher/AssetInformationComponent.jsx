import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'layouts/style/AssetInformationComponent.css'


function AssetInformationComponent({ nft, index }) {
  const [assetInfo, setAssetInfo] = useState([]);

// .............................to get additional information using opensea api..............................
  
useEffect(() => {
    const fetchAssetInfo = async () => {
      try {
        const response = await axios.get
          (`https://testnets-api.opensea.io/api/v1/asset/${nft.address}/${nft.tokenId}`);
        if (response && response.data) {
          const updatedData = {
            ...response.data,
            index: nft.nftId
          };
          setAssetInfo((prev) => [...prev, updatedData]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (nft.tokenId && nft.address) {
        fetchAssetInfo();
      }
}, []);



  return (
    <div>
      {assetInfo.length > 0 && index? (
        <div className='asset-info'>
          <p>Id: {assetInfo[0].id}</p>
          <p>Name: {assetInfo[0].name}</p>
          <p>Description: {assetInfo[0].description}</p>
          <p>Number of Sales: {assetInfo[0].num_sales}</p>
          <p>Created Date: {assetInfo[0]?.asset_contract?.created_date}</p>
          <p>Collection: {assetInfo[0]?.collection?.slug}</p>          
        </div>
      ) : (
        <p>Fetching...</p>
      )}
    </div>
  );
}

export default AssetInformationComponent;
