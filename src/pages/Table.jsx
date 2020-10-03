import React from "react"

function Table({country}){
    return(
        <div className="table">
       {country.map(({country,cases})=>(
           <tr>
               <td>{country} </td>
       <td>{cases}</td>
           </tr>
       ))}
        </div>
    )
}

export default Table
