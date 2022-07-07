export const baseURL = 'https://172.19.0.22';
export const homeURL = 'https://localhost:4200';
export const environment = {
  production: false,
  trainingServiceUrl: 'http://localhost:3000/kypo-rest-training/api/v1/',
  elasticSearchServiceUrl: 'https://172.19.0.22/kypo-elasticsearch-service/api/v1/',
  authConfig: {
    guardMainPageRedirect: 'home', // Redirect from login page if user is logged in
    guardLoginPageRedirect: 'login', // Redirect to login page if user is not logged in
    interceptorAllowedUrls: [baseURL, 'https://localhost', 'http://localhost'],
    authorizationStrategyConfig: {
      authorizationUrl: baseURL + '/kypo-rest-user-and-group/api/v1/users/info',
    },
    providers: [
      {
        label: 'Login with local issuer',
        textColor: 'white',
        backgroundColor: '#002776',
        oidcConfig: {
          issuer: 'https://172.19.0.22:443/csirtmu-dummy-issuer-server/',
          clientId: 'ztJxraMTteXYGOiJreWjFfvmJhHXhHiRhcXo',
          redirectUri: homeURL, // redirect after successful login
          scope: 'openid email profile',
          logoutUrl: 'https://172.19.0.22/csirtmu-dummy-issuer-server/endsession/endsession',
          postLogoutRedirectUri: homeURL + '/logout-confirmed/',
          silentRefreshRedirectUri: homeURL + '/silent-refresh.html',
          clearHashAfterLogin: true, // remove token and other info from url after login
        },
      },
    ],
  },
};
