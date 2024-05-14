export const BASE_URL = 'https://172.19.0.22';
export const HOME_URL = 'https://localhost:4200';
export const localURL = 'http://localhost:3000';
export const userAngGroupURL = BASE_URL + '/kypo-rest-user-and-group/api/v1/';

export const environment = {
  production: false,
  trainingServiceUrl: localURL + '/kypo-rest-training/api/v1/',
  authConfig: {
    guardMainPageRedirect: 'home', // Redirect from login page if user is logged in
    guardLoginPageRedirect: 'login', // Redirect to login page if user is not logged in
    interceptorAllowedUrls: [
      // all matching urls will have authorization token header
      BASE_URL, 'https://localhost', 'http://localhost'
    ],
    authorizationStrategyConfig: {
      authorizationUrl: userAngGroupURL + 'users/info',
    },
    providers: [
      {
        label: 'Login with local issuer',
        textColor: 'white',
        backgroundColor: '#002776',
        oidcConfig: {
          requireHttps: true,
          issuer: BASE_URL + '/keycloak/realms/KYPO',
          clientId: 'KYPO-client',
          redirectUri: HOME_URL,
          scope: 'openid email profile offline_access',
          logoutUrl: BASE_URL + '/keycloak/realms/KYPO/protocol/openid-connect/logout',
          silentRefreshRedirectUri: BASE_URL + '/silent-refresh.html',
          postLogoutRedirectUri: HOME_URL + '/logout-confirmed',
          clearHashAfterLogin: true,
        },
      },
    ],
  },
};
