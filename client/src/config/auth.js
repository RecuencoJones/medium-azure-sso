import { UserAgentApplication } from 'msal';

const clientId = process.env.VUE_APP_AAD_CLIENT_ID;
const tenantId = process.env.VUE_APP_AAD_TENANT_ID;
const redirectUri = window.location.origin;

const config = {
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${ tenantId }`,
    redirectUri,
    postLogoutRedirectUri: redirectUri
  }
};

const tokenConfig = {
  scopes: [ 'User.Read' ]
};

export const auth = new UserAgentApplication(config);

auth.handleRedirectCallback((error) => {
  if (error) {
    console.error(error);
  }
});

export const getToken = () => auth.acquireTokenSilent(tokenConfig)
  .catch(() => auth.acquireTokenRedirect(tokenConfig))
  .then(({ idToken }) => idToken.rawIdToken);
