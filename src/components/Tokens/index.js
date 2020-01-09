import React from 'react';

function Tokens({token}){
    return(
        <div>
            <h3>Tokens</h3>
            <p>Access token:<br></br>{token.access_token}</p>
            <p>Refresh token:<br></br>{token.refresh_token}</p>
        </div>
    )
}

export default Tokens;