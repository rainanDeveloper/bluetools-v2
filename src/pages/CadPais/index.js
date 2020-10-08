import React, {useState, useEffect} from 'react'
import './style.css'
import SupMenuAdmin from '../../components/SupMenuAdmin'
import HtmlTable from '../../components/HtmlTable'
import api from '../../services/api'

function CadPais(){
	
	const [countries, setCountries] = useState([])

	const authToken = localStorage.getItem('authToken')

	useEffect(()=>{
		api.get('/country/',{
			headers:{
				'auth': authToken
			}
		}).then(response=>{
			setCountries(response.data)
		})
	}, [setCountries,authToken])

	return (
		<>
			<SupMenuAdmin/>
			<div className="listContainer">
				<h1 className="titleListTable">Países</h1>
				<div className="utility">
					<div className="searchArea">
						<input type="text" id="searchInput" placeholder="Buscar..."/>
					</div>
					<div className="utilityButtons">
						<button className="color-primary">Novo</button>
						<button className="color-primary">Editar</button>
						<button className="color-primary">Imprimir</button>
					</div>
				</div>
				<HtmlTable id="tblPais" tableTitles={[
					{title: "Código", dataKey: "id"},
					{title:"Abreviação", dataKey: "abbreviation"},
					{title: "Nome", dataKey: 'name'},
					{title:"Moeda", dataKey: 'currency'}
					]} tableData={countries}/>
			</div>
		</>
	)
}

export default CadPais