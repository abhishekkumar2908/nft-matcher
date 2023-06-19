import React from "react";
import config from "config";
import AccessToken from "services/AccessToken";

const accessTokenService = new AccessToken();

export default class SyncService extends React.Component {
  syncStatueBytenantId = async (tenantId) => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/sync/status/" + tenantId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };
  syncUsersBytenantId = async (tenantId) => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/user/add/" + tenantId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  syncGroupsBytenantId = async (tenantId) => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/group/add/" + tenantId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  syncAppsBytenantId = async (tenantId) => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/apps/add/" + tenantId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  syncPoliciesBytenantId = async (tenantId) => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/policies/add/" + tenantId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  syncUserTypesBytenantId = async (tenantId) => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/user-types/add/" + tenantId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  syncOrgSettingsBytenantId = async (tenantId) => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/org-settings/add/" + tenantId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  syncBrandsBytenantId = async (tenantId) => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/brands/add/" + tenantId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  syncTemplatesBytenantId = async (tenantId) => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/templates/add/" + tenantId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  syncSystemLogsBytenantId = async (tenantId) => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/system-logs/add/" + tenantId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  syncFeaturesBytenantId = async (tenantId) => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/features/add/" + tenantId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  syncAuthServersBytenantId = async (tenantId) => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/auth-servers/add/" + tenantId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  syncRolesBytenantId = async (tenantId) => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/roles/add/" + tenantId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  syncEventHooksBytenantId = async (tenantId) => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/event-hooks/add/" + tenantId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  syncGroupRulesBytenantId = async (tenantId) => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/group-rules/add/" + tenantId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  syncIdpsBytenantId = async (tenantId) => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/idps/add/" + tenantId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  syncInlineHooksBytenantId = async (tenantId) => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/inline-hooks/add/" + tenantId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  syncMappingsBytenantId = async (tenantId) => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/mappings/add/" + tenantId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  syncTrustedOriginsBytenantId = async (tenantId) => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/trusted-origins/add/" + tenantId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  syncNetworkZonesBytenantId = async (tenantId) => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/network-zones/add/" + tenantId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  syncDomainsBytenantId = async (tenantId) => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/domains/add/" + tenantId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  syncHookKeysBytenantId = async (tenantId) => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/hook-keys/add/" + tenantId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  syncLogStreamsBytenantId = async (tenantId) => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/log-streams/add/" + tenantId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  syncAuthenticatorsBytenantId = async (tenantId) => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/authenticators/add/" + tenantId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  syncCaptchasBytenantId = async (tenantId) => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/captchas/add/" + tenantId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  syncDevicesBytenantId = async (tenantId) => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/devices/add/" + tenantId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  syncPushProvidersBytenantId = async (tenantId) => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/push-providers/add/" + tenantId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  syncThreatInsightsBytenantId = async (tenantId) => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/threat-insight/add/" + tenantId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  syncRiskProvidersBytenantId = async (tenantId) => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/risk-providers/add/" + tenantId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };

  syncDataWithAutomationBytenantId = async (tenantId) => {
    const accessToken = await accessTokenService.getAccessToken();
    return fetch(config.api.BASE_URL + "/api/tenant/automation/" + tenantId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  };
}
