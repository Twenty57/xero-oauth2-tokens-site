import React from 'react';

function Tokens({token}){
    return(
        <div>
            <h3>Tokens</h3>
            <h4>Access token</h4>
            <p>{token.access_token}&nbsp;
            <button onClick={()=>navigator.clipboard.writeText(token.access_token)}>copy</button></p>

            <h4>Refresh token</h4>
            <p>{token.refresh_token}&nbsp;
            <button onClick={()=>navigator.clipboard.writeText(token.refresh_token)}>copy</button></p>
        </div>
    )
}

export default Tokens;