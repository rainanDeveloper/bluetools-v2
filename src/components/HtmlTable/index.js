import React from 'react'
import './style.css'

function HtmlTable({id, tableData, tableTitles, selection, selectionCallback,itemDoubleClickCallback=(()=>{})}){
	

	function selectItem(idSelected){
		selectionCallback(tableData.map(data=>{
			data.selected=(parseInt(data.id)===parseInt(idSelected))
			return data
		}))
	}

	function selectOnClick(target){
		const checkbox = target.closest('tr').querySelector('td.tableItemSelectorColumn input')
		checkbox.checked=true
		selectItem(checkbox.value)
	}

	return (
		<table id={id} className="htmlBluetoolsTable">
			<thead>
				<tr className="color-primary">
					{selection?<th className="tableHeaderSelectorColumn"></th>:<></>}
					{tableTitles&&tableTitles.map((title, index)=>{
						return <th key={index}>{title.title}</th>
					})}
				</tr>
			</thead>
			<tbody>
				{tableData&&tableData.map((dataRow, index)=>{
					return (
					<tr className={dataRow.selected?'selected':''} key={index} onClick={(event)=>{
						selectOnClick(event.target)
					}} onDoubleClick={itemDoubleClickCallback}>
						{selection?<td className="tableItemSelectorColumn">
							<input name={`selectedItem${id}`} value={dataRow.id} onChange={(event)=>{
								selectItem(event.target.value)
							}} type="radio"/>
						</td>:<></>}
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