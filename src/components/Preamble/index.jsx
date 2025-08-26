import React from 'react';

function Preamble(){
    return(
    <div>
        <h1>Xero OAuth2 Access Tokens.</h1>
        <p>Use this tool to get Xero access tokens for your <a target="_blank" rel="noopener noreferrer" 
            href="https://developer.xero.com/myapps/">Xero Apps</a> that do not have user interfaces e.g.
        integrations using the Xero API running on servers in the background.
        </p>
        <h4>How it works</h4>
        <p>Prerequisites:</p>
        <ul>
        <li>A Xero App, its client id and client secret.</li>
        <li>An OAuth2 redirect URI setup on the Xero App pointing to {window.location.origin + "/auth"} .</li>
        <li>User access to the Xero organisation that you want to connect to.</li>
        </ul>
        <p>Step 1: Select the <a target="_blank" rel="noopener noreferrer" 
            href="https://developer.xero.com/documentation/oauth2/scopes">scopes</a> your Xero App requires.</p>
        <p>Step 2: Provide the client id of your Xero App and connect to Xero. Xero will ask you to login and approve the connection and scopes.</p>
        <p>Step 3: Provide the client secret of your Xero App and get the access tokens from Xero. 
        The request can only be done server side so we call an API hosted on a <a target="_blank" rel="noopener noreferrer" 
            href="https://linx.software">Linx Server</a> to forward 
        the request and return the tokens. No client data or tokens are saved or logged on the Linx Server.</p>
        <p>Step 4: The tenants connected to your Xero App are requested and displayed. A tenant id is required to make calls to Xero APIs. 
        This request is also done through the API hosted on Linx.
        </p>
        <h4>Source code</h4>
        <ul>
        <li>Web site: <a target="_blank" rel="noopener noreferrer" href="https://github.com/Twenty57/xero-oauth2-tokens-site">https://github.com/Twenty57/xero-oauth2-tokens-site</a></li>
        <li>API: <a target="_blank" rel="noopener noreferrer" href="https://github.com/Twenty57/xero-oauth2-tokens-api">https://github.com/Twenty57/xero-oauth2-tokens-api</a></li>
        </ul>
        <h4>Warning</h4>
        <p>Your Xero App credentials and Xero organisation access tokens are visible in your browser and flows through an API not 
        under your control. Only use this for testing purposes using a demo company. For production use your 
        own <a target="_blank" rel="noopener noreferrer" href="https://linx.software">Linx Server</a> to request the tokens.</p>
    </div>
    );
};

export default Preamble