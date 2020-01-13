export async function GetToken(clientId, clientSecret, code){
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

  export function ConnectToXero(clientId, scope){
    const query = new URLSearchParams({
        "response_type": "code",
        "client_id":  clientId,
        "redirect_uri": window.location.origin + "/auth",
        "scope": "offline_access " + scope,
        "state": "test"
    });
    window.location = `https://login.xero.com/identity/connect/authorize?${query.toString()}`;
  }
  
  export async function GetTenants(accessToken){
    let response = await fetch(process.env.REACT_APP_API_HOST + `/tenants?accessToken=${accessToken}`);
    return response.json();
  }
  
  export function StoreClientId(clientId){
    sessionStorage.setItem("clientId", clientId);
  }
  
  export function GetClientIdFromStore(){
    return sessionStorage.getItem("clientId"||"");
  }
  
  export function StoreScopes(scopes){
    sessionStorage.setItem("scopes", JSON.stringify(scopes));
  }
  
  export function GetScopesFromStore(){
    return JSON.parse(sessionStorage.getItem("scopes")||"[]");
  }