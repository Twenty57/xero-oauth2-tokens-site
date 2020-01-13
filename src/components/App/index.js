import React, {useState, useCallback} from 'react';
import Preamble from '../Preamble';
import ClientId from '../ClientId';
import ClientSecret from '../ClientSecret';
import Tokens from '../Tokens';
import Tenants from '../Tenants';
import Scope from '../Scope';
import * as utils from './utils';

function App() {
  const [clientId, setClientId] = useState(utils.GetClientIdFromStore());
  const [scopes, setScopes] = useState(utils.GetScopesFromStore());
  const [code, setCode] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [token, setToken] = useState("");
  const [isGettingToken, setIsGettingToken] = useState(false);
  const [tenants, setTenants] = useState("");
  const [isGettingTenants, setIsGettingTenants] = useState(false);

  React.useEffect(()=>{
    utils.StoreScopes(scopes);
    utils.StoreClientId(clientId);
  }, [scopes, clientId]);

  const updateTokens = useCallback(async () => {
    try{
      const token = await utils.GetToken(clientId, clientSecret, code);
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
      const tenants = await utils.GetTenants(token.access_token);
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
      <Preamble/>
      <Scope scopes={scopes} setScopes={setScopes}/>
      <ClientId clientId={clientId} setClientId={setClientId} handleConnect={()=>utils.ConnectToXero(clientId, scopes.join(" "))}/>
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
  );
}

export default App;
