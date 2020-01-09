import React from 'react';

function ClientSecret({clientSecret, setClientSecret, getTokens}){

    const onSubmit = event => {
        getTokens();
        event.preventDefault();
    }

    return (
        <form onSubmit={onSubmit}>
                <h3>Step 2: Provide your client secret and get access tokens</h3>
                <label>Client secret: </label>
                <input style={{width:"20em"}} name="clientSecret" type="password" value={clientSecret} onChange={(event)=>setClientSecret(event.target.value)} required />
                <button style={{margin: "1em"}} type="submit">Get access tokens</button>
      </form>
    )
}

export default ClientSecret;