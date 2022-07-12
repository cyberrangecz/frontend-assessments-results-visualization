export const baseURL = 'https://172.19.0.22';
export const homeURL = 'https://localhost:4200';
export const trainingURL = baseURL + '/kypo-rest-training/api/v1/';
export const userAngGroupURL = baseURL + '/kypo-rest-user-and-group/api/v1/';

export const environment = {
  production: true,
  trainingServiceUrl: trainingURL,
  authConfig: {
    guardMainPageRedirect: 'home', // Redirect from login page if user is logged in
    guardLoginPageRedirect: 'login', // Redirect to login page if user is not logged in
    interceptorAllowedUrls: [
      // all matching urls will have authorization token header
      baseURL,
    ],
    authorizationStrategyConfig: {
      authorizationUrl: userAngGroupURL + 'users/info',
    },
    providers: [
      // OIDC providers
      {
        label: 'Login with MUNI',
        textColor: 'white',
        backgroundColor: '#002776',
        oidcConfig: {
          issuer: 'https://172.19.0.22:443/csirtmu-dummy-issuer-server/',
          clientId: '0bf33f00-2700-4efb-ab09-186076f85c7d',
          redirectUri: homeURL, // redirect after successful login
          scope: 'openid email profile',
          logoutUrl: 'https://172.19.0.22/csirtmu-dummy-issuer-server/endsession',
          postLogoutRedirectUri: homeURL + '/logout-confirmed/',
          silentRefreshRedirectUri: homeURL + '/silent-refresh.html',
          clearHashAfterLogin: true, // remove token and other info from url after login
        },
      },
    ],
  },
};
