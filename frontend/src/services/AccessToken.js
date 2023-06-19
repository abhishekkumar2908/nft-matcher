import React from "react";

import config from "config";

const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const poolData = {
  UserPoolId: config.awsConfig.UserPoolId,
  ClientId: config.awsConfig.ClientId,
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

export default class AccessToken extends React.Component {
  getAccessToken = async () => {
    // console.log(AWS.config.credentials.needsRefresh());
    // console.log("inside the getAccessToken function");
    const user = userPool.getCurrentUser();
    if (user) {
      const accessToken = await user.getSession((err, session) => {
        // console.log("session session session from fetchInteceptor");
        // console.log(session);
        // console.log(session.getAccessToken().jwtToken);
        if (err) console.log(err);
        return session.getAccessToken().jwtToken;
      });
      return accessToken;
    }
  };
}
