# google-permissions
Authenticate users with Google asking for platform permissions. Starter app.

## Setup

```
git clone https://github.com/codealchemist/google-permissions
cd google-permissions
npm install
```

After installing all dependencies the git remote will be removed.
From there you can start working on your own stuff and add your own repository.

## Set Credentials

To authenticate with Google you need to have a Google app.
Goto https://console.developers.google.com, download the credentials file for your project
and store it as `credentials.json` in the root folder of this app.

## Local run

`npm run`

## Dockerized run

Init and run instance:

`npm run docker-start`

Rebuild and run instance:

`npm run docker-rebuild`

## Why?

I wanted a small starter app with Docker integration to easily setup Google logins.

Enjoy!

## Reference

This work is based on this great example from Google:

https://github.com/GoogleCloudPlatform/nodejs-getting-started/tree/master/4-auth
