// This file can be replaced during build by using the `fileReplacements` array.
// The list of file replacements can be found in `angular.json`.

// OIDC url
const OIDC_URL = 'https://172.19.0.22';
// backend url
const API_URL = 'http://localhost:3000';
// frontend home url
const HOME_URL = 'https://localhost:4200';

export const environment = {
    production: false,
    trainingServiceUrl: API_URL + '/training/api/v1/',
    authConfig: {
        guardMainPageRedirect: 'home', // Redirect from login page if user is logged in
        guardLoginPageRedirect: 'login', // Redirect to login page if user is not logged in
        interceptorAllowedUrls: [API_URL, OIDC_URL],
        authorizationStrategyConfig: {
            authorizationUrl: OIDC_URL + '/user-and-group/api/v1/users/info',
        },
        providers: [
            {
                label: 'Login with local Keycloak',
                textColor: 'white',
                backgroundColor: '#1e2173',
                oidcConfig: {
                    requireHttps: true,
                    clearHashAfterLogin: true,
                    issuer: OIDC_URL + '/keycloak/realms/CRCZP',
                    clientId: 'CRCZP-client',
                    redirectUri: HOME_URL,
                    scope: 'openid email profile offline_access',
                    logoutUrl: OIDC_URL + '/keycloak/realms/CRCZP/protocol/openid-connect/logout',
                    silentRefreshRedirectUri: HOME_URL + '/silent-refresh.html',
                    postLogoutRedirectUri: HOME_URL + '/logout-confirmed'
                }
            }
        ]
    },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
