import React from 'react';

function Tokens({token}){
    return(
        <div>
            <h3>Tokens</h3>
            <h4>Access token</h4>
            <p>{token.access_token}</p>
            <h4>Refresh token</h4>
            <p>{token.refresh_token}</p>
        </div>
    )
}

export default Tokens;