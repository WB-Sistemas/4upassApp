import { Environment } from '@abp/ng.core';

const baseUrl = 'https://4upass.com';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'Tickets',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: baseUrl,
    clientId: 'Tickets_Ionic',
    ClientSecret: '1q2w3E*',
    scope: 'offline_access Tickets',
    redirectUri: baseUrl,
    requireHttps: false,
  },
  apis: {
    default: {
      url: baseUrl,
      rootNamespace: 'Tickets.WB',
    },
  },
} as Environment;

