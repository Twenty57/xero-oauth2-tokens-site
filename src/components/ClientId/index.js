import React from 'react';

function ClientId({clientId, setClientId}){

    const onSubmit = event => {
        const query = new URLSearchParams({
            "response_type": "code",
            "client_id":  clientId,
            "redirect_uri": window.location.origin + "/auth",
            "scope": "offline_access accounting.transactions",
            "state": "test"
        });
        window.location = `https://login.xero.com/identity/connect/authorize?${query.toString()}`;
        event.preventDefault();
    }

    return (
        <form onSubmit={onSubmit}>
                <h3>Step 1: Provide your client id and connect to Xero</h3>
                <label>Client id: </label>
                <input style={{width:"20em"}} name="clientId" type="text" value={clientId} onChange={(event)=>setClientId(event.target.value)} required />
                <button style={{margin:"1em"}} type="submit">Connect to Xero</button>
      </form>
    )
}

export default ClientId;