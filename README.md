# Xero OAuth2 Access Tokens

Use this tool to get Xero access tokens for your Xero Apps that do not have user interfaces e.g. integrations using the Xero API running on servers in the background.

## How it works

Prerequisites:
- A Xero App that the user controls.
- An OAuth2 redirect URI setup on the Xero App that points to [host]/auth.
- User access to the Xero organisation that the user wants to connect to.

Step 1: The user fills in the client id of their Xero App and then connects to Xero. Xero asks the user to login and approve the connection and then redirects to the OAuth2 redirect URI with a code.

Step 2: The user fills in the client secret of their Xero App and then requests the access tokens from Xero using the code provided in step 1. The request can only be done server side so we call an API endpoint hosted on a [Linx Server](https://linx.software) to forward the request and return the tokens.

## Source code

This repo contains the web site. The API runs on [Linx](https://linx.software) and the Linx solution can be found at https://github.com/Twenty57/xero-oauth2-tokens-api