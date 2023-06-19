import React from "react";
import config from "config";
import AccessToken from "services/AccessToken";

const accessTokenService = new AccessToken();

export default class TanentService extends React.Component {
  addTenant = async (values) => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({
        tenantUrl: values.tenantUrl,
        name: values.name,
        apiKey: values.apiKey,
        type: values.type,
        tenantType: values.tenantType,
        userName: values.userName,
        password: values.password,
        answer: values.answer,
        tenantAdminUrl: values.tenantAdminUrl,
      }),
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  updateTenant = async (values) => {
    // console.log(values);
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/" + values._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({
        tenantUrl: values.tenantUrl,
        name: values.name,
        // apiKey: values.apiKey,
        type: values.type,
        tenantType: values.tenantType,
        userName: values.userName,
        password: values.password,
        answer: values.answer,
        tenantAdminUrl: values.tenantAdminUrl,
      }),
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  getTanentsByUser = async () => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  deleteTanentById = async (tenantId) => {
    console.log("inside the handle tenant function");
    const accessToken = await accessTokenService.getAccessToken();
    console.log(accessToken);
    return fetch(config.api.BASE_URL + "/api/tenant/delete/" + tenantId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  getTanentDetailsById = async (tenantId) => {
    console.log("inside the handle tenant function");
    const accessToken = await accessTokenService.getAccessToken();
    console.log(accessToken);
    return fetch(config.api.BASE_URL + "/api/tenant/report/" + tenantId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  exportExcelByTenantId = async (tenant) => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/download/report/" + tenant._id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((response) =>
        response.blob().then((blob) => {
          console.log("blob blob blob blob");
          console.log(blob);
          let newDate = new Date();
          let date = newDate.getDate();
          let month = newDate.getMonth() + 1;
          let year = newDate.getFullYear();

          // console.log(date);
          // console.log(month);
          // console.log(year);

          let finalDate =
            date +
            "-" +
            month +
            "-" +
            year +
            ": " +
            newDate.getHours() +
            ":" +
            newDate.getMinutes();

          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);

          link.download = tenant.name + "-Okta-Asis-assessmentreport-" + finalDate + ".xlsx";
          link.click();
        })
      );
  };
}
