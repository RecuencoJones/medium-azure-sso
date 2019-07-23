# Azure AD SSO example

Featuring:

- Vue
- msal.js
- NestJS
- passport
- passport-azure-ad

## Create Azure AD Tenant

1. Log in to [Azure portal](https://portal.azure.com).
1. On the left side, select [Azure Active Directory](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/Overview).
1. On the right side, select `Create directory` and fill in the form (it takes about a minute to be created).
1. Once done, reload the `Overview` page for [Azure Active Directory](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/Overview).

## Create an App Registration

1. From [Azure Active Directory](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/Overview) select [App registrations](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps).
1. Click on `New registration` and fill in the form.

   For `Redirect URI` we select `Web` and `http://localhost:8080` (where our client is hosted).

The App registration will provide a unique client ID as well as the tenant ID which will be used later. There are a couple of things we still need to setup:

1. From `Authentication > Advanced Settings > Implicit grant` section, select `ID tokens`.
1. From `Manifest` section we will add the following values:

    ```json
    "accessTokenAcceptedVersion": 2,
    "appRoles": [
      {
        "allowedMemberTypes": [
          "User"
        ],
        "description": "Admin user for the application",
        "displayName": "Administrator",
        "id": "ccf2cb33-c1d2-4101-a1e8-b88e1d3806b2",
        "isEnabled": true,
        "lang": null,
        "origin": "Application",
        "value": "Admin"
      },
      {
        "allowedMemberTypes": [
          "User"
        ],
        "description": "Common user for the application",
        "displayName": "User",
        "id": "2ca47286-7be9-47b8-9c76-1369b3021506",
        "isEnabled": true,
        "lang": null,
        "origin": "Application",
        "value": "User"
      }
    ],
    "signInAudience": "AzureADandPersonalMicrosoftAccount"
    ```

    `accessTokenAcceptedVersion: 2` is required to work with v2.0 of the AAD API which also allows using roles and users from multiple orgs and personal accounts.
    `signInAudience: AzureADandPersonalMicrosoftAccount` enables the later.
    `appRoles` will be an array of roles that we can assign to users allowed into our application.

## Add some users

1. From the `Overview` section of the App registration you created look for `Managed application in local directory` and click the link next to it. That will take us to the `Enterprise Application Overview`.
1. Now go to `Users and groups` section.


We are ready to play now!

## Configure environment

Create a .env file at `./server` with the following properties:

```
AAD_CLIENT_ID=<client ID>
AAD_TENANT_ID=<tenant ID>
```

Then, copy the file to `./client` prefixing the variables with `VUE_APP_`:

```
VUE_APP_AAD_CLIENT_ID=<client ID>
VUE_APP_AAD_TENANT_ID=<tenant ID>
```

## Start the server

On a different terminal run:

```
cd server
npm install
npm start
```

By default it will be running at [http://localhost:3000](http://localhost:3000)

## Start the client

Open up a terminal and run:

```
cd client
npm install
npm start
```

By default it will be running at [http://localhost:8080](http://localhost:8080)

## Testing SSO and token validation

### Get an ID Token

From the Web UI click the button `Login with SSO`.

It will redirect to Microsoft's log in page. Once successful, you will be redirected back to the application and the username and id token will be displayed.

We need this id token to authorize server calls.

### Use the request for server calls

```
curl -X GET \
  http://localhost:3000/me \
  -H 'Authorization: Bearer <id token>'
```

And we can even use it to validate that the user complies with various claims, for example: roles

```
curl -X GET \
  http://localhost:3000/admin \
  -H 'Authorization: Bearer <id token>'
```
