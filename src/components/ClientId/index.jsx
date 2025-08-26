import React from 'react';

function ClientId({clientId, setClientId, handleConnect}){

    const onSubmit = event => {
        handleConnect();
        event.preventDefault();
    }

    return (
        <form onSubmit={onSubmit}>
                <h3>Step 2: Provide your client id and connect to Xero</h3>
                <label>Client id: </label>
                <input style={{width:"20em"}} name="clientId" type="text" value={clientId} onChange={(event)=>setClientId(event.target.value)} required />
                <button style={{margin:"1em"}} type="submit">Connect to Xero</button>
      </form>
    )
}

export default ClientId;