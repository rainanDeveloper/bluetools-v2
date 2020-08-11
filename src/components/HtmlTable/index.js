import React from 'react'
import './style.css'

function HtmlTable({id, tableData, tableTitles}){
	return (
		<table id={id} className="htmlBluetoolsTable">
			<thead>
				<tr className="color-primary">
					{tableTitles&&tableTitles.map((title, index)=>{
						return <th key={index}>{title}</th>
					})}
				</tr>
			</thead>
			<tbody>
				{tableData&&tableData.map((dataRow, index)=>{
					const keyArray = Object.keys(dataRow)
					return (
					<tr key={index}>
						{keyArray.map(key=>{
							return <td key={key}>{dataRow[key]}</td>
						})}
					</tr>
					)
				})}
			</tbody>
		</table>
	)
}

export default HtmlTable