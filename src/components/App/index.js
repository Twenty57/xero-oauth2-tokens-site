import React, {useState, useCallback} from 'react';
import ClientId from '../ClientId';
import ClientSecret from '../ClientSecret';
import Tokens from '../Tokens';
import Tenants from '../Tenants';

function App() {
  const [clientId, setClientId] = useState(sessionStorage.getItem("clientId")||"");
  const [code, setCode] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [token, setToken] = useState("");
  const [isGettingToken, setIsGettingToken] = useState(false);
  const [tenants, setTenants] = useState("");
  const [isGettingTenants, setIsGettingTenants] = useState(false);

  React.useEffect(()=>{
      sessionStorage.setItem("clientId", clientId);
  }, [clientId]);

  const updateTokens = useCallback(async () => {
    try{
      const token = await GetToken(clientId, clientSecret, code);
      setToken(token);
      setIsGettingTenants(true);
    }
    catch{
      alert(`Something went wrong. Possible causes are
      - Client secret is incorrect.
      - 5min have passed since connecting to Xero. Please Connect to Xero again.
      - Your network is down.`);
    }
    setIsGettingToken(false);
  }, [clientId, clientSecret, code]);

  React.useEffect(()=>{
    if(isGettingToken){
      updateTokens();
    }
  }, [isGettingToken, updateTokens]);

  const updateTenants = useCallback(async () => {
    try{
      const tenants = await GetTenants(token.access_token);
      setTenants(tenants);
    }
    catch{
      alert(`Something went wrong getting your tenants. You can get your tenants using Postman or Linx.`);
    }
    setIsGettingTenants(false);
  }, [token]);

  React.useEffect(()=>{
    if(isGettingTenants){
      updateTenants();
    }
  }, [isGettingTenants, updateTenants]);

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
      <p>Prerequisites:</p>
      <ul>
        <li>A Xero App that you control.</li>
        <li>An OAuth2 redirect URI setup on the Xero App pointing to {window.location.origin + "/auth"} .</li>
        <li>User access to the Xero organisation that you want to connect to.</li>
      </ul>
      <p>Step 1: Provide the client id of your Xero App and connect to Xero. Xero will ask you to login and approve the connection and then 
        redirects with a code.</p>
      <p>Step 2: Provide the client secret of your Xero App and get the access tokens from Xero. 
        The request can only be done server side so we call an API hosted on a <a href="https://linx.software">Linx Server</a> to forward 
        the request and return the tokens. No client data or tokens are saved or logged on the Linx Server.</p>
      <p>Step 3: The tenants connected to your Xero App are requested and displayed. A tenant id is required to make calls to Xero APIs. 
        This request is also done through the API hosted on Linx.
      </p>
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
        {isGettingTenants === true && <p>getting the tenants...</p>}
        {tenants !== "" && <Tenants tenants={tenants} />}
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

  let response = await fetch(process.env.REACT_APP_API_HOST + "/token", config);
  return response.json();
}

async function GetTenants(accessToken){
  let response = await fetch(process.env.REACT_APP_API_HOST + `/tenants?accessToken=${accessToken}`);
  return response.json();
}

export default App;
