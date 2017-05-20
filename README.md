## Setup with Google
### Non Admin Setup
1. In a non admin console, create an app, enable the google drive api.
2. Under credentials, add a service account with option "Enable G Suite Domain-wide Delegation"
3. Download the JSON file, add "subject": "email@example.com" to the JSON.
4. Note the client ID
https://console.developers.google.com/iam-admin/serviceaccounts
https://console.developers.google.com

### Admin Setup
1. Go to https://admin.google.com/
2. Under security -> Enable GSuite access
3. Security -> Advanced -> Manage API access:
https://admin.google.com/AdminHome?chromeless=1#OGX:ManageOauthClients
4. Add the client ID (obtained before) and a scope like https://www.googleapis.com/auth/drive.readonly.
