import React, {useState, useCallback} from 'react';
import ClientId from '../ClientId';
import ClientSecret from '../ClientSecret';
import Tokens from '../Tokens';

function App() {
  const [clientId, setClientId] = useState(sessionStorage.getItem("clientId")||"");
  const [code, setCode] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [token, setToken] = useState("");
  const [isGettingToken, setIsGettingToken] = useState(false);

  React.useEffect(()=>{
      sessionStorage.setItem("clientId", clientId);
  }, [clientId]);

  const doUpdate = useCallback(async () => {
    const token = await GetToken(clientId, clientSecret, code);
    setToken(token);
    setIsGettingToken(false);
  }, [clientId, clientSecret, code]);

  React.useEffect(()=>{
    if(isGettingToken){
      doUpdate();
    }
  }, [isGettingToken, doUpdate]);

  if(window.location.pathname==="/auth" && code === "")
  {
    const query = new URLSearchParams(window.location.search);
    setCode(query.get("code"));
    window.history.pushState("","","/");
  }

  return (
    <div>
      <h1>Xero OAuth2 Access Tokens.</h1>
      <p>Use this tool to get Xero access tokens for your <a href="https://developer.xero.com/myapps/">Xero Apps</a> that do not have user interfaces e.g.
        integrations using the Xero API running on servers in the background.
      </p>
      <h4>How it works</h4>
      <p>Prerequisites: 
        <ul>
          <li>A <a href="https://developer.xero.com/myapps/">Xero App</a> that you control.</li>
          <li>An OAuth2 redirect URI of {window.location.origin + "/auth"} setup on the Xero App.</li>
          <li>User access to the Xero organisation that you want to connect to.</li>
        </ul>
      </p>
      <p>Step 1: You provide the client id of your Xero App and we connect to Xero. Xero asks you to login and approve the connection and then 
        redirects with a code.</p>
      <p>Step 2: You provide the client secret of your Xero App and we request the access tokens from Xero using the code provided in step 1. 
        The request can only be done server side so we call an API endpoint hosted on a <a href="https://linx.software">Linx Server</a> to forward 
        the request and return the tokens. No data is saved or logged on the Linx Server.</p>
      <h4>Source code</h4>
      <ul>
        <li>Web site: <a href="https://github.com/Twenty57/xero-oauth2-tokens-site">https://github.com/Twenty57/xero-oauth2-tokens-site</a></li>
        <li>API: <a href="https://github.com/Twenty57/xero-oauth2-tokens-api">https://github.com/Twenty57/xero-oauth2-tokens-api</a></li>
      </ul>
      <h4>Warning</h4>
      <p>Your Xero App credentials and Xero organisation access tokens are visible in your browser and flows through an API endpoint not 
        under your control. Only use this for testing purposes using a demo company. For production use your 
        own <a href="https://linx.software">Linx Server</a> to request the tokens.</p>
      <div>
        <ClientId clientId={clientId} setClientId={setClientId}/>
        {code !== "" && <ClientSecret 
                          clientSecret={clientSecret} 
                          setClientSecret={setClientSecret}
                          getTokens={()=>setIsGettingToken(true)}>
                        </ClientSecret>}
        {isGettingToken === true && <p>getting the tokens...</p>}
        {token !== "" && <Tokens token={token} />}
      </div>
    </div>
  );
}

async function GetToken(clientId, clientSecret, code){
  let config = {
    method: "POST",
    body: JSON.stringify({
      "clientId": clientId,
      "clientSecret": clientSecret,
      "code": code,
      "redirectUri": window.location.origin + "/auth"
    }),
    headers: {
      "Content-Type": "application/json"
    }
  };

  let response = await fetch(process.env.REACT_APP_TOKEN_URI, config);
  return response.json();
}

export default App;
