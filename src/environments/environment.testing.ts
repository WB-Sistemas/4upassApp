import { Environment } from '@abp/ng.core';

const baseUrl = 'https://tickets.wbsistemas.com.ar';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'Tickets',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: baseUrl,
    redirectUri: baseUrl,
    clientId: 'Tickets_App',
    ClientSecret: '1q2w3E*',
    scope: 'offline_access Tickets',
    strictDiscoveryDocumentValidation: false,
    skipIssuerCheck: true,
    requireHttps: true
  },
  apis: {
    default: {
      url: baseUrl,
      rootNamespace: 'Tickets.WB',
    },
  },
} as Environment;
