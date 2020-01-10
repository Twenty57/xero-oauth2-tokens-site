import React from 'react';

function Tenants({tenants}){
    const tenantRows = tenants.map((tenant, index) => {
            return(
                <tr>
                    <td>{tenant.tenantId}</td>
                    <td>{tenant.tenantType}</td>
                </tr>
            )
    });

    return(
        <div>
            <h3>Tenants</h3>
            <table style={{"textAlign":"left"}}>
                <thead>
                    <tr><th>Tenant id</th><th>Tenant type</th></tr>
                </thead>
                <tbody>{tenantRows}</tbody>
            </table>
        </div>
    )
}

export default Tenants;