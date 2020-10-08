import React from 'react'
import './style.css'

function HtmlTable({id, tableData, tableTitles}){
	return (
		<table id={id} className="htmlBluetoolsTable">
			<thead>
				<tr className="color-primary">
					{tableTitles&&tableTitles.map((title, index)=>{
						return <th key={index}>{title.title}</th>
					})}
				</tr>
			</thead>
			<tbody>
				{tableData&&tableData.map((dataRow, index)=>{
					return (
					<tr key={index}>
						{tableTitles.map(titleObj=>{
							return (
								<td key={titleObj.dataKey}>
									{dataRow[titleObj.dataKey]}
								</td>
							)
						})}
					</tr>
					)
				})}
			</tbody>
		</table>
	)
}

export default HtmlTable