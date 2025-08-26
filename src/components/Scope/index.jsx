import React from 'react';

const otherScopes = [
    "files",
    "files.read",
    "assets",
    "assets.read",
    "projects",
    "projects.read"
]

const accountingScopes = [
    "accounting.transactions",
    "accounting.transactions.read",
    "accounting.reports.read",
    "accounting.journals.read",
    "accounting.settings",
    "accounting.settings.read",
    "accounting.contacts",
    "accounting.contacts.read",
    "accounting.attachments",
    "accounting.attachments.read"
]

const payrollScopes = [
    "payroll.employees",
    "payroll.employees.read",
    "payroll.payruns",
    "payroll.payruns.read",
    "payroll.payslip",
    "payroll.payslip.read",
    "payroll.timesheets",
    "payroll.timesheets.read",
    "payroll.settings",
    "payroll.settings.read"
]

const CheckboxList = ({scopes, handleChange})=>
     <div style={{display:"inline-block", verticalAlign:"top"}}>
            <ul style={{listStyle:"none"}}>
            {scopes.map(item => (
                <li key={item.name}>
                    <label>
                    <input type="checkbox" name={item.name} checked={item.checked} onChange={handleChange}/>
                    {item.name}</label>
                </li>
            ))}
            </ul>
        </div>;

function Scope({scopes, setScopes}){
    const handleChange = (e)=>{
        if(e.target.checked){
            setScopes(scopes.concat(e.target.name));
        }
        else{
            setScopes(scopes.filter((value)=>value!==e.target.name));
        }
    }

    const createCheckedScopes = (scopeArray)=>{
        return scopeArray.map(item=>{
            return {"name": item, "checked": scopes.some(checkedItem=>item===checkedItem)};
        });
    }

    return (
        <div>
            <h3>Step 1: Select the scopes required by your Xero App</h3>
            <p>'offline_access' scope is automatically included. For more about scopes 
                see the <a target="_blank" rel="noopener noreferrer" 
                href="https://developer.xero.com/documentation/oauth2/scopes">Xero scopes documentation</a></p>
            <CheckboxList scopes={createCheckedScopes(accountingScopes)} handleChange={handleChange}/>
            <CheckboxList scopes={createCheckedScopes(payrollScopes)} handleChange={handleChange}/>
            <CheckboxList scopes={createCheckedScopes(otherScopes)} handleChange={handleChange}/>
        </div>
    )
}

export default Scope;